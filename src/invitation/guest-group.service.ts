import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuestGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  private async assertOwnership(uniqueId: string, userId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: { uniqueId, userId },
      select: { id: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return invitation;
  }

  // ─── Guest Settings ───

  async updateGuestSettings(
    uniqueId: string,
    userId: number,
    data: {
      isPasswordProtected?: boolean;
      universalPassword?: string;
      guestListEnabled?: boolean;
    },
  ) {
    await this.assertOwnership(uniqueId, userId);
    return this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        ...(data.isPasswordProtected !== undefined && {
          isPasswordProtected: data.isPasswordProtected,
        }),
        ...(data.universalPassword !== undefined && {
          universalPassword: data.universalPassword,
        }),
        ...(data.guestListEnabled !== undefined && {
          guestListEnabled: data.guestListEnabled,
        }),
      },
      select: {
        isPasswordProtected: true,
        universalPassword: true,
        guestListEnabled: true,
      },
    });
  }

  // ─── Verify Password (Public) ───
  //
  // Access policy:
  //   isPasswordProtected = false                       → OPEN
  //   isPasswordProtected = true  + universalPassword   → COMMON   (match universal)
  //   isPasswordProtected = true  + no universalPassword → SPECIFIC (match per-guest name + password)
  //
  // Name match is normalized (lowercase + all whitespace stripped).

  private normalizeName(value: string | null | undefined): string {
    return (value ?? '').toLowerCase().replace(/\s+/g, '');
  }

  async verifyPassword(uniqueId: string, password: string, name?: string) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      select: {
        id: true,
        isPasswordProtected: true,
        universalPassword: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    // OPEN
    if (!invitation.isPasswordProtected) {
      return { verified: true, guestGroup: null };
    }

    // COMMON — universalPassword present
    if (invitation.universalPassword) {
      if (invitation.universalPassword === password) {
        return { verified: true, guestGroup: null };
      }
      return { verified: false, guestGroup: null };
    }

    // SPECIFIC — per-guest name + password
    const normalizedName = this.normalizeName(name);
    if (!normalizedName) {
      return { verified: false, guestGroup: null };
    }

    const candidates = await this.prismaService.invitationGuestGroup.findMany({
      where: { invitationId: invitation.id, password },
      select: {
        id: true,
        name: true,
        maxPax: true,
        rsvpTitle: true,
        layoutOverride: true,
      },
    });

    const guestGroup = candidates.find(
      (g) => this.normalizeName(g.name) === normalizedName,
    );

    if (!guestGroup) {
      return { verified: false, guestGroup: null };
    }

    return { verified: true, guestGroup };
  }

  // ─── Guest Group CRUD ───

  async getGuestGroups(uniqueId: string, userId: number) {
    const invitation = await this.assertOwnership(uniqueId, userId);
    return this.prismaService.invitationGuestGroup.findMany({
      where: { invitationId: invitation.id },
      include: {
        InvitationRSVP: {
          select: {
            id: true,
            name: true,
            attending: true,
            pax: true,
            createdAt: true,
          },
        },
        InvitationSeatAssignment: {
          include: {
            InvitationSeatingTable: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  async createGuestGroup(
    uniqueId: string,
    userId: number,
    data: {
      name: string;
      password?: string;
      side?: 'groom' | 'bride' | 'common';
      maxPax?: number;
      rsvpTitle?: string;
      layoutOverride?: any;
      memo?: string;
    },
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);

    const lastOrder = await this.prismaService.invitationGuestGroup.findFirst({
      where: { invitationId: invitation.id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    return this.prismaService.invitationGuestGroup.create({
      data: {
        invitationId: invitation.id,
        name: data.name,
        password: data.password ?? null,
        side: (data.side as any) ?? 'common',
        maxPax: data.maxPax ?? 1,
        rsvpTitle: data.rsvpTitle ?? null,
        layoutOverride: data.layoutOverride ?? undefined,
        memo: data.memo ?? null,
        order: (lastOrder?.order ?? 0) + 1,
      },
    });
  }

  async updateGuestGroup(
    uniqueId: string,
    userId: number,
    guestGroupId: number,
    data: {
      name?: string;
      password?: string;
      side?: 'groom' | 'bride' | 'common';
      maxPax?: number;
      rsvpTitle?: string;
      layoutOverride?: any;
      memo?: string;
    },
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);

    const group = await this.prismaService.invitationGuestGroup.findFirst({
      where: { id: guestGroupId, invitationId: invitation.id },
    });
    if (!group) {
      throw new NotFoundException('Guest group not found');
    }

    return this.prismaService.invitationGuestGroup.update({
      where: { id: guestGroupId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.password !== undefined && { password: data.password }),
        ...(data.side !== undefined && { side: data.side as any }),
        ...(data.maxPax !== undefined && { maxPax: data.maxPax }),
        ...(data.rsvpTitle !== undefined && { rsvpTitle: data.rsvpTitle }),
        ...(data.layoutOverride !== undefined && {
          layoutOverride: data.layoutOverride,
        }),
        ...(data.memo !== undefined && { memo: data.memo }),
      },
    });
  }

  async deleteGuestGroup(
    uniqueId: string,
    userId: number,
    guestGroupId: number,
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);

    const group = await this.prismaService.invitationGuestGroup.findFirst({
      where: { id: guestGroupId, invitationId: invitation.id },
    });
    if (!group) {
      throw new NotFoundException('Guest group not found');
    }

    await this.prismaService.invitationGuestGroup.delete({
      where: { id: guestGroupId },
    });

    return { deleted: true };
  }

  // ─── RSVP Linking ───

  async linkRsvp(
    uniqueId: string,
    userId: number,
    guestGroupId: number,
    rsvpId: number,
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);

    const group = await this.prismaService.invitationGuestGroup.findFirst({
      where: { id: guestGroupId, invitationId: invitation.id },
    });
    if (!group) {
      throw new NotFoundException('Guest group not found');
    }

    const rsvp = await this.prismaService.invitationRSVP.findFirst({
      where: { id: rsvpId, invitationId: invitation.id },
    });
    if (!rsvp) {
      throw new NotFoundException('RSVP not found');
    }

    await this.prismaService.$transaction([
      this.prismaService.invitationRSVP.update({
        where: { id: rsvpId },
        data: { guestGroupId },
      }),
      this.prismaService.invitationGuestGroup.update({
        where: { id: guestGroupId },
        data: {
          rsvpStatus: rsvp.attending ? 'ACCEPTED' : 'DECLINED',
          rsvpAt: rsvp.createdAt,
        },
      }),
    ]);

    return { linked: true };
  }

  async unlinkRsvp(
    uniqueId: string,
    userId: number,
    guestGroupId: number,
    rsvpId: number,
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);

    const rsvp = await this.prismaService.invitationRSVP.findFirst({
      where: {
        id: rsvpId,
        invitationId: invitation.id,
        guestGroupId,
      },
    });
    if (!rsvp) {
      throw new NotFoundException('RSVP not found or not linked');
    }

    await this.prismaService.$transaction([
      this.prismaService.invitationRSVP.update({
        where: { id: rsvpId },
        data: { guestGroupId: null },
      }),
      this.prismaService.invitationGuestGroup.update({
        where: { id: guestGroupId },
        data: { rsvpStatus: 'PENDING', rsvpAt: null },
      }),
    ]);

    return { unlinked: true };
  }

  // ─── Seating Tables ───

  async getSeatingTables(uniqueId: string, userId: number) {
    const invitation = await this.assertOwnership(uniqueId, userId);
    return this.prismaService.invitationSeatingTable.findMany({
      where: { invitationId: invitation.id },
      include: {
        InvitationSeatAssignment: {
          include: {
            InvitationGuestGroup: {
              select: { id: true, name: true, side: true },
            },
          },
          orderBy: { seatNumber: 'asc' },
        },
      },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  async createSeatingTable(
    uniqueId: string,
    userId: number,
    data: { name: string; capacity: number },
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);
    return this.prismaService.invitationSeatingTable.create({
      data: {
        invitationId: invitation.id,
        name: data.name,
        capacity: data.capacity,
      },
    });
  }

  async updateSeatingTable(
    uniqueId: string,
    userId: number,
    tableId: number,
    data: { name?: string; capacity?: number },
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);
    const table = await this.prismaService.invitationSeatingTable.findFirst({
      where: { id: tableId, invitationId: invitation.id },
    });
    if (!table) throw new NotFoundException('Table not found');

    return this.prismaService.invitationSeatingTable.update({
      where: { id: tableId },
      data,
    });
  }

  async deleteSeatingTable(
    uniqueId: string,
    userId: number,
    tableId: number,
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);
    const table = await this.prismaService.invitationSeatingTable.findFirst({
      where: { id: tableId, invitationId: invitation.id },
    });
    if (!table) throw new NotFoundException('Table not found');

    await this.prismaService.invitationSeatingTable.delete({
      where: { id: tableId },
    });
    return { deleted: true };
  }

  async assignSeat(
    uniqueId: string,
    userId: number,
    tableId: number,
    guestGroupId: number,
    seatNumber?: number,
  ) {
    const invitation = await this.assertOwnership(uniqueId, userId);

    const table = await this.prismaService.invitationSeatingTable.findFirst({
      where: { id: tableId, invitationId: invitation.id },
      include: { _count: { select: { InvitationSeatAssignment: true } } },
    });
    if (!table) throw new NotFoundException('Table not found');

    if (table._count.InvitationSeatAssignment >= table.capacity) {
      throw new BadRequestException('Table is full');
    }

    const group = await this.prismaService.invitationGuestGroup.findFirst({
      where: { id: guestGroupId, invitationId: invitation.id },
    });
    if (!group) throw new NotFoundException('Guest group not found');

    // Remove existing assignment if any
    await this.prismaService.invitationSeatAssignment
      .deleteMany({ where: { guestGroupId } })
      .catch(() => {});

    return this.prismaService.invitationSeatAssignment.create({
      data: {
        seatingTableId: tableId,
        guestGroupId,
        seatNumber: seatNumber ?? null,
      },
    });
  }

  async unassignSeat(
    uniqueId: string,
    userId: number,
    tableId: number,
    guestGroupId: number,
  ) {
    await this.assertOwnership(uniqueId, userId);

    await this.prismaService.invitationSeatAssignment.deleteMany({
      where: { seatingTableId: tableId, guestGroupId },
    });

    return { unassigned: true };
  }
}
