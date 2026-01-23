import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DressColorType } from './dto/dress-color.dto';

@Injectable()
export class InvitationColorService {
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

  async getDressColors(uniqueId: string, userId: number, type?: DressColorType) {
    const invitation = await this.getInvitation(uniqueId, userId);
    return this.prismaService.invitationDressColor.findMany({
      where: {
        invitationId: invitation.id,
        ...(type ? { type } : {}),
      },
      orderBy: [
        { type: 'asc' },
        { order: 'asc' },
        { id: 'asc' },
      ],
    });
  }

  async addDressColor(
    uniqueId: string,
    userId: number,
    type: DressColorType,
    color: string,
    order?: number,
  ) {
    const invitation = await this.getInvitation(uniqueId, userId);
    const maxOrder = await this.prismaService.invitationDressColor.aggregate({
      where: { invitationId: invitation.id, type },
      _max: { order: true },
    });
    const nextOrder = (maxOrder._max.order ?? 0) + 1;
    return this.prismaService.invitationDressColor.create({
      data: {
        invitationId: invitation.id,
        type,
        color: this.normalizeColor(color),
        order: order ?? nextOrder,
      },
    });
  }

  async updateDressColor(
    uniqueId: string,
    userId: number,
    colorId: number,
    color: string,
  ) {
    const invitation = await this.getInvitation(uniqueId, userId);
    const existing = await this.prismaService.invitationDressColor.findFirst({
      where: { id: colorId, invitationId: invitation.id },
      select: { id: true },
    });
    if (!existing) {
      throw new NotFoundException('Dress color not found');
    }
    return this.prismaService.invitationDressColor.update({
      where: { id: colorId },
      data: { color: this.normalizeColor(color) },
    });
  }

  async deleteDressColor(uniqueId: string, userId: number, colorId: number) {
    const invitation = await this.getInvitation(uniqueId, userId);
    const result = await this.prismaService.invitationDressColor.deleteMany({
      where: { id: colorId, invitationId: invitation.id },
    });
    if (result.count === 0) {
      throw new NotFoundException('Dress color not found');
    }
    return { deleted: result.count };
  }

  async updateDressColorOrder(
    uniqueId: string,
    userId: number,
    colorIds: number[],
    type?: DressColorType,
  ) {
    const invitation = await this.getInvitation(uniqueId, userId);
    const existing = await this.prismaService.invitationDressColor.findMany({
      where: {
        invitationId: invitation.id,
        id: { in: colorIds },
        ...(type ? { type } : {}),
      },
      select: { id: true, type: true },
    });
    if (existing.length !== colorIds.length) {
      throw new BadRequestException('Invalid dress color list');
    }

    const updates = colorIds.map((id, index) =>
      this.prismaService.invitationDressColor.update({
        where: { id },
        data: { order: index + 1 },
      }),
    );
    await this.prismaService.$transaction(updates);
    return { updated: colorIds.length };
  }
}
