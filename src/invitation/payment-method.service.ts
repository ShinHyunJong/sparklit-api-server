import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import cryptoRandomString from 'crypto-random-string';
import { MemoryStoredFile } from 'nestjs-form-data';

import { assertImageMime } from 'src/helpers/mime.helper';
import { deleteFromS3, upload2S3 } from 'src/helpers/s3.helper';
import { PrismaService } from 'src/prisma/prisma.service';

import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from './dto/payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prismaService: PrismaService) {}

  // ─── Internal: ownership guard ───
  private async assertOwnership(uniqueId: string, userId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: { uniqueId, userId },
      select: { id: true, uniqueId: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return invitation;
  }

  // ─── List ───
  async list(uniqueId: string, userId: number) {
    const invitation = await this.assertOwnership(uniqueId, userId);
    return this.prismaService.invitationPaymentMethod.findMany({
      where: { invitationId: invitation.id },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  // ─── Public list (no auth) — used by the public invitation view ───
  async listPublic(uniqueId: string) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      select: { id: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return this.prismaService.invitationPaymentMethod.findMany({
      where: { invitationId: invitation.id },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
      select: {
        id: true,
        type: true,
        accountName: true,
        accountNumber: true,
        qrImageKey: true,
        memo: true,
        order: true,
      },
    });
  }

  // ─── Create ───
  async create(
    uniqueId: string,
    userId: number,
    data: CreatePaymentMethodDto,
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);

    const lastOrder = await this.prismaService.invitationPaymentMethod.findFirst({
      where: { invitationId: invitation.id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    return this.prismaService.invitationPaymentMethod.create({
      data: {
        invitationId: invitation.id,
        type: data.type,
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        qrImageKey: data.qrImageKey,
        memo: data.memo,
        order: data.order ?? (lastOrder?.order ?? -1) + 1,
      },
    });
  }

  // ─── Update ───
  async update(
    uniqueId: string,
    userId: number,
    methodId: number,
    data: UpdatePaymentMethodDto,
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);

    const existing =
      await this.prismaService.invitationPaymentMethod.findFirst({
        where: { id: methodId, invitationId: invitation.id },
      });
    if (!existing) {
      throw new NotFoundException('Payment method not found');
    }

    return this.prismaService.invitationPaymentMethod.update({
      where: { id: methodId },
      data: {
        ...(data.type !== undefined && { type: data.type }),
        ...(data.accountName !== undefined && { accountName: data.accountName }),
        ...(data.accountNumber !== undefined && {
          accountNumber: data.accountNumber,
        }),
        ...(data.qrImageKey !== undefined && { qrImageKey: data.qrImageKey }),
        ...(data.memo !== undefined && { memo: data.memo }),
        ...(data.order !== undefined && { order: data.order }),
      },
    });
  }

  // ─── Delete ───
  async delete(uniqueId: string, userId: number, methodId: number) {
    const invitation = await this.assertOwnership(uniqueId, userId);
    const existing =
      await this.prismaService.invitationPaymentMethod.findFirst({
        where: { id: methodId, invitationId: invitation.id },
        select: { id: true, qrImageKey: true },
      });
    if (!existing) {
      throw new NotFoundException('Payment method not found');
    }

    if (existing.qrImageKey) {
      await deleteFromS3(existing.qrImageKey).catch(() => {
        // log-and-continue: DB delete proceeds even if S3 cleanup fails
      });
    }

    await this.prismaService.invitationPaymentMethod.delete({
      where: { id: methodId },
    });
    return { deleted: 1 };
  }

  // ─── QR upload ───
  async uploadQr(
    uniqueId: string,
    userId: number,
    methodId: number,
    file: MemoryStoredFile,
  ) {
    assertImageMime(file.mimeType);
    const invitation = await this.assertOwnership(uniqueId, userId);
    const existing =
      await this.prismaService.invitationPaymentMethod.findFirst({
        where: { id: methodId, invitationId: invitation.id },
        select: { id: true, qrImageKey: true },
      });
    if (!existing) {
      throw new NotFoundException('Payment method not found');
    }

    const random = cryptoRandomString({ length: 16 });
    const ext = (file.mimeType.split('/')[1] ?? 'png').toLowerCase();
    const qrImageKey = `invitations/${uniqueId}/payment-qr/${methodId}-${random}.${ext}`;
    await upload2S3(qrImageKey, file.buffer);

    if (existing.qrImageKey && existing.qrImageKey !== qrImageKey) {
      await deleteFromS3(existing.qrImageKey).catch(() => {});
    }

    await this.prismaService.invitationPaymentMethod.update({
      where: { id: methodId },
      data: { qrImageKey },
    });
    return { qrImageKey };
  }

  async deleteQr(uniqueId: string, userId: number, methodId: number) {
    const invitation = await this.assertOwnership(uniqueId, userId);
    const existing =
      await this.prismaService.invitationPaymentMethod.findFirst({
        where: { id: methodId, invitationId: invitation.id },
        select: { id: true, qrImageKey: true },
      });
    if (!existing) {
      throw new NotFoundException('Payment method not found');
    }
    if (!existing.qrImageKey) return { deleted: 0 };

    await deleteFromS3(existing.qrImageKey).catch(() => {});
    await this.prismaService.invitationPaymentMethod.update({
      where: { id: methodId },
      data: { qrImageKey: null },
    });
    return { deleted: 1 };
  }
}
