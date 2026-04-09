import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HASH_KEY } from 'src/constants';
import { deleteFromS3 } from 'src/helpers/s3.helper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private parseGuestNameList(value?: string | null) {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((name) => String(name).trim()).filter(Boolean);
    } catch {
      return value
        .split(/[\n,]+/)
        .map((name) => name.trim())
        .filter(Boolean);
    }
  }

  async getDashboardSummary() {
    const [
      totalInvitationCount,
      totalPlaceCount,
      totalPhotoCount,
      totalRsvpCount,
    ] = await Promise.all([
      this.prismaService.invitation.count({
        where: {
          user: { OR: [{ isAdmin: { not: true } }, { isAdmin: null }] },
        },
      }),
      this.prismaService.invitationPlace.count({
        where: {
          invitation: {
            user: { OR: [{ isAdmin: { not: true } }, { isAdmin: null }] },
          },
        },
      }),
      this.prismaService.invitationPhoto.count({
        where: {
          Invitation: {
            is: {
              user: { OR: [{ isAdmin: { not: true } }, { isAdmin: null }] },
            },
          },
        },
      }),
      this.prismaService.invitationRSVP.count({
        where: {
          invitation: {
            user: { OR: [{ isAdmin: { not: true } }, { isAdmin: null }] },
          },
        },
      }),
    ]);

    return {
      totalInvitationCount,
      totalPlaceCount,
      totalPhotoCount,
      totalRsvpCount,
    };
  }

  async getInvitationList() {
    const invitationList = await this.prismaService.invitation.findMany({
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: {
        id: true,
        uniqueId: true,
        templateNo: true,
        billingStatus: true,
        currentPlanCode: true,
        brideFirstName: true,
        brideLastName: true,
        groomFirstName: true,
        groomLastName: true,
        date: true,
        createdAt: true,
        updatedAt: true,
        placeList: {
          orderBy: [{ order: 'asc' }, { id: 'asc' }],
          select: {
            id: true,
            timeList: {
              orderBy: [{ id: 'asc' }],
              select: {
                time: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            isAdmin: true,
          },
        },
      },
    });

    return invitationList.map((invitation) => {
      const firstPlaceTime =
        invitation.placeList
          .flatMap((place) => place.timeList)
          .find((timeItem) => timeItem.time)?.time ?? null;

      const createdAt = invitation.createdAt
        ? new Date(invitation.createdAt)
        : new Date();
      const trialEndDate = new Date(createdAt);
      trialEndDate.setDate(trialEndDate.getDate() + 3);
      trialEndDate.setHours(0, 0, 0, 0);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffMs = trialEndDate.getTime() - now.getTime();
      const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      return {
        id: invitation.id,
        uniqueId: invitation.uniqueId,
        templateNo: invitation.templateNo,
        billingStatus: invitation.billingStatus,
        currentPlanCode: invitation.currentPlanCode,
        brideFirstName: invitation.brideFirstName,
        brideLastName: invitation.brideLastName,
        groomFirstName: invitation.groomFirstName,
        groomLastName: invitation.groomLastName,
        date: invitation.date,
        createdAt: invitation.createdAt,
        updatedAt: invitation.updatedAt,
        user: invitation.user,
        isAdmin: invitation.user?.isAdmin === true,
        planCode: invitation.currentPlanCode,
        daysLeft,
        firstPlaceTime,
      };
    });
  }

  async getUserFunnel() {
    const nonAdminFilter = {
      OR: [{ isAdmin: { not: true } }, { isAdmin: null }],
    };

    const [totalUsers, users, invitations, paidOrders] = await Promise.all([
      this.prismaService.user.count({ where: nonAdminFilter }),
      this.prismaService.user.findMany({
        where: nonAdminFilter,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
          invitationList: {
            select: {
              id: true,
              uniqueId: true,
              billingStatus: true,
              currentPlanCode: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.invitation.count({
        where: { user: nonAdminFilter },
      }),
      this.prismaService.invitationOrder.count({
        where: {
          status: 'PAID',
          User: nonAdminFilter,
        },
      }),
    ]);

    const usersWithInvitation = users.filter(
      (u) => u.invitationList.length > 0,
    ).length;
    const usersWithPaidPlan = users.filter((u) =>
      u.invitationList.some((inv) => inv.billingStatus === 'PAID'),
    ).length;

    const userList = users.map((u) => {
      const hasPaid = u.invitationList.some(
        (inv) => inv.billingStatus === 'PAID',
      );
      const hasInvitation = u.invitationList.length > 0;
      let stage = 'Signed Up';
      if (hasPaid) stage = 'Paid';
      else if (hasInvitation) stage = 'Trial';

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        createdAt: u.createdAt,
        invitationCount: u.invitationList.length,
        paidPlanCode: u.invitationList.find(
          (inv) => inv.billingStatus === 'PAID',
        )?.currentPlanCode ?? null,
        stage,
      };
    });

    return {
      funnel: {
        totalUsers,
        usersWithInvitation,
        usersWithPaidPlan,
        totalInvitations: invitations,
        totalPaidOrders: paidOrders,
      },
      userList,
    };
  }

  async getTrialInvitationList() {
    const invitations = await this.prismaService.invitation.findMany({
      where: {
        billingStatus: 'TRIAL',
        user: { OR: [{ isAdmin: { not: true } }, { isAdmin: null }] },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: {
        id: true,
        uniqueId: true,
        brideFirstName: true,
        groomFirstName: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          },
        },
        _count: {
          select: {
            photoList: true,
            invitationCoverPhotoList: true,
          },
        },
      },
    });

    return invitations.map((inv) => {
      const createdAt = inv.createdAt ? new Date(inv.createdAt) : new Date();
      const trialEndDate = new Date(createdAt);
      trialEndDate.setDate(trialEndDate.getDate() + 3);
      trialEndDate.setHours(0, 0, 0, 0);

      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const diffMs = trialEndDate.getTime() - now.getTime();
      const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      return {
        id: inv.id,
        uniqueId: inv.uniqueId,
        groomFirstName: inv.groomFirstName,
        brideFirstName: inv.brideFirstName,
        email: inv.user?.email ?? null,
        createdAt: inv.createdAt,
        daysLeft,
        photoCount: inv._count.photoList + inv._count.invitationCoverPhotoList,
      };
    });
  }

  async getAllInvitationsForManagement() {
    const invitations = await this.prismaService.invitation.findMany({
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: {
        id: true,
        uniqueId: true,
        billingStatus: true,
        currentPlanCode: true,
        brideFirstName: true,
        groomFirstName: true,
        createdAt: true,
        user: {
          select: {
            email: true,
            isAdmin: true,
          },
        },
        _count: {
          select: {
            photoList: true,
            invitationCoverPhotoList: true,
          },
        },
      },
    });

    return invitations.map((inv) => {
      const createdAt = inv.createdAt ? new Date(inv.createdAt) : new Date();
      const trialEndDate = new Date(createdAt);
      trialEndDate.setDate(trialEndDate.getDate() + 3);
      trialEndDate.setHours(0, 0, 0, 0);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffMs = trialEndDate.getTime() - now.getTime();
      const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      return {
        id: inv.id,
        uniqueId: inv.uniqueId,
        billingStatus: inv.billingStatus,
        currentPlanCode: inv.currentPlanCode,
        groomFirstName: inv.groomFirstName,
        brideFirstName: inv.brideFirstName,
        email: inv.user?.email ?? null,
        isAdmin: inv.user?.isAdmin === true,
        createdAt: inv.createdAt,
        daysLeft,
        photoCount: inv._count.photoList + inv._count.invitationCoverPhotoList,
      };
    });
  }

  async deleteInvitationByAdmin(invitationId: number) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { id: invitationId },
      include: {
        photoList: true,
        invitationCoverPhotoList: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    const rawKeys = [
      invitation.ogImageKey,
      invitation.musicKey,
      invitation.musicFileKey,
      ...invitation.photoList.flatMap((photo) => [
        photo.originalKey,
        photo.croppedKey,
        photo.thumbKey,
      ]),
      ...invitation.invitationCoverPhotoList.flatMap((photo) => [
        photo.originalKey,
        photo.croppedKey,
      ]),
    ];

    const keysToDelete = rawKeys.filter(
      (key): key is string => Boolean(key && !key.startsWith('assets/')),
    );

    await Promise.all(keysToDelete.map((key) => deleteFromS3(key)));
    await this.prismaService.invitation.delete({
      where: { id: invitation.id },
    });

    return { deleted: 1, s3KeysDeleted: keysToDelete.length };
  }

  async getInvitationRsvpList(invitationIdentifier: string) {
    const parsedInvitationId = Number(invitationIdentifier);
    const canUseInvitationId = Number.isInteger(parsedInvitationId) && parsedInvitationId > 0;
    const invitation = await this.prismaService.invitation.findFirst({
      where: {
        ...(canUseInvitationId
          ? {
              OR: [
                { id: parsedInvitationId },
                { uniqueId: invitationIdentifier },
              ],
            }
          : { uniqueId: invitationIdentifier }),
        user: {
          is: {
            OR: [{ isAdmin: { not: true } }, { isAdmin: null }],
          },
        },
      },
      select: {
        id: true,
        uniqueId: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    const rsvpList = await this.prismaService.invitationRSVP.findMany({
      where: { invitationId: invitation.id },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: {
        id: true,
        side: true,
        name: true,
        guestNameList: true,
        email: true,
        phone: true,
        remark: true,
        food: true,
        pax: true,
        attending: true,
        createdAt: true,
      },
    });

    return rsvpList.map((item) => ({
      ...item,
      guestNameList: this.parseGuestNameList(item.guestNameList),
    }));
  }

  async updateInvitationBillingStatus(
    invitationId: number,
    billingStatus: 'TRIAL' | 'PAID',
    currentPlanCode: 'STANDARD' | 'PREMIUM' | null,
  ) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { id: invitationId },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    const isPaid = billingStatus === 'PAID';
    const now = new Date();

    await this.prismaService.invitation.update({
      where: { id: invitationId },
      data: {
        billingStatus,
        currentPlanCode: isPaid ? currentPlanCode : null,
        watermarkEnabled: !isPaid,
        accessStartedAt: isPaid ? now : null,
        accessEndsAt: isPaid && currentPlanCode === 'STANDARD'
          ? new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
          : null,
      },
    });

    return { updated: true };
  }

  /**
   * Create a short-lived JWT for impersonating a user. Used by the admin
   * "Edit as User" flow to jump into sparklit-web as that user for a limited
   * time without knowing their credentials.
   */
  async createImpersonationToken(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    if (!user) {
      throw new NotFoundException(`User not found: ${userId}`);
    }
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        payload: user.email ?? '',
        impersonation: true,
      },
      {
        secret: HASH_KEY,
        expiresIn: '1h',
      },
    );
    return { accessToken };
  }
}
