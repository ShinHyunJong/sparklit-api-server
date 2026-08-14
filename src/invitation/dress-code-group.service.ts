import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import cryptoRandomString from 'crypto-random-string';
import { MemoryStoredFile } from 'nestjs-form-data';
import { PrismaService } from 'src/prisma/prisma.service';

import { compressOriginal } from 'src/helpers/image.helper';
import { assertImageMime } from 'src/helpers/mime.helper';
import { deleteFromS3, upload2S3 } from 'src/helpers/s3.helper';

import { DressCodeGroupDto } from './dto/dress-code-group.dto';

@Injectable()
export class DressCodeGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  private normalizeColor(color: string) {
    const normalized = color.trim().toLowerCase();
    return normalized.startsWith('#') ? normalized : `#${normalized}`;
  }

  private async getInvitation(uniqueId: string, userId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: { uniqueId, userId },
      select: { id: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return invitation;
  }

  private async loadGroups(invitationId: number) {
    return this.prismaService.invitationDressCodeGroup.findMany({
      where: { invitationId },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
      include: {
        colors: {
          orderBy: [{ order: 'asc' }, { id: 'asc' }],
          select: { id: true, color: true, order: true },
        },
      },
    });
  }

  async getGroups(uniqueId: string, userId: number) {
    const invitation = await this.getInvitation(uniqueId, userId);
    return this.loadGroups(invitation.id);
  }

  /**
   * Save the whole group list as a snapshot.
   *
   * Groups are upserted (id present → update, absent → create) so each group's
   * photoKey — saved separately via the photo endpoint — is preserved across
   * saves. Groups no longer in the payload are deleted (their colors cascade).
   * Colors are simpler: delete-all + recreate per group, since they carry
   * nothing worth preserving by id.
   */
  async updateGroups(
    uniqueId: string,
    userId: number,
    groups: DressCodeGroupDto[],
  ) {
    const invitation = await this.getInvitation(uniqueId, userId);

    const existing = await this.prismaService.invitationDressCodeGroup.findMany({
      where: { invitationId: invitation.id },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((g) => g.id));

    // Only trust ids that actually belong to this invitation; treat anything
    // else (missing, or a stray/temporary client id) as a new group.
    const incoming = groups.map((g, index) => ({
      id: g.id && existingIds.has(g.id) ? g.id : undefined,
      label: g.label === undefined ? undefined : g.label,
      description: g.description ?? null,
      order: g.order ?? index,
      colors: (g.colors ?? []).map((c, ci) => ({
        color: this.normalizeColor(c.color),
        order: c.order ?? ci,
      })),
    }));

    const keptSet = new Set(
      incoming
        .map((g) => g.id)
        .filter((id): id is number => typeof id === 'number'),
    );
    const toDelete = [...existingIds].filter((id) => !keptSet.has(id));

    await this.prismaService.$transaction(async (tx) => {
      // 1) Delete groups that vanished from the payload (colors cascade via FK).
      if (toDelete.length) {
        await tx.invitationDressCodeGroup.deleteMany({
          where: { id: { in: toDelete }, invitationId: invitation.id },
        });
      }

      // 2) Upsert each incoming group, then rewrite its colors.
      for (const g of incoming) {
        let groupId: number;
        if (g.id) {
          await tx.invitationDressCodeGroup.update({
            where: { id: g.id },
            data: {
              ...(g.label !== undefined ? { label: g.label } : {}),
              description: g.description,
              order: g.order,
            },
          });
          groupId = g.id;
        } else {
          const created = await tx.invitationDressCodeGroup.create({
            data: {
              invitationId: invitation.id,
              label: g.label ?? null,
              description: g.description,
              order: g.order,
            },
            select: { id: true },
          });
          groupId = created.id;
        }

        await tx.invitationDressColor.deleteMany({ where: { groupId } });
        if (g.colors.length) {
          await tx.invitationDressColor.createMany({
            data: g.colors.map((c) => ({
              invitationId: invitation.id,
              groupId,
              color: c.color,
              order: c.order,
            })),
          });
        }
      }
    });

    return this.loadGroups(invitation.id);
  }

  private async getOwnedGroup(
    uniqueId: string,
    userId: number,
    groupId: number,
  ) {
    const invitation = await this.getInvitation(uniqueId, userId);
    const group = await this.prismaService.invitationDressCodeGroup.findFirst({
      where: { id: groupId, invitationId: invitation.id },
    });
    if (!group) {
      throw new NotFoundException('Dress code group not found');
    }
    return { invitation, group };
  }

  /** Upload / replace a group's photo. Stores the cropped image key on the group. */
  async updateGroupPhoto(
    uniqueId: string,
    userId: number,
    groupId: number,
    body: {
      originalFile: MemoryStoredFile;
      croppedFile: MemoryStoredFile;
      photoJSON?: string;
    },
  ) {
    const { group } = await this.getOwnedGroup(uniqueId, userId, groupId);

    const originalFile = body.originalFile;
    const croppedFile = body.croppedFile;
    if (!originalFile || !croppedFile) {
      throw new BadRequestException('Both original and cropped files are required');
    }
    assertImageMime(originalFile.mimeType);
    assertImageMime(croppedFile.mimeType);

    const compressed = await compressOriginal(originalFile.buffer);
    const originalName = cryptoRandomString({ length: 16 });
    const croppedName = cryptoRandomString({ length: 16 });
    const croppedExtension = croppedFile.mimeType.split('/')[1];

    const originalKey = `invitations/${uniqueId}/dress-code/original/${originalName}.jpeg`;
    const croppedKey = `invitations/${uniqueId}/dress-code/cropped/${croppedName}.${croppedExtension}`;

    await upload2S3(originalKey, compressed.buffer);
    await upload2S3(croppedKey, croppedFile.buffer);

    // Remove the previous cropped image so orphans don't accumulate.
    const prevKey = group.photoKey;

    const updated = await this.prismaService.invitationDressCodeGroup.update({
      where: { id: groupId },
      data: { photoKey: croppedKey },
    });

    if (prevKey && prevKey !== croppedKey) {
      await deleteFromS3(prevKey).catch(() => undefined);
    }

    return updated;
  }

  /** Remove a group's photo. */
  async deleteGroupPhoto(uniqueId: string, userId: number, groupId: number) {
    const { group } = await this.getOwnedGroup(uniqueId, userId, groupId);
    if (group.photoKey) {
      await deleteFromS3(group.photoKey).catch(() => undefined);
    }
    return this.prismaService.invitationDressCodeGroup.update({
      where: { id: groupId },
      data: { photoKey: null },
    });
  }
}
