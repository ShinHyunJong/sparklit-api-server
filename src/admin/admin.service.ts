import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
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

  async getInvitationList(upcomingOnly = false) {
    // "Upcoming only": weddings dated today-or-later, soonest first.
    const startOfToday = dayjs().startOf('day').toDate();
    const invitationList = await this.prismaService.invitation.findMany({
      where: upcomingOnly ? { date: { gte: startOfToday } } : undefined,
      orderBy: upcomingOnly
        ? [{ date: 'asc' }, { id: 'asc' }]
        : [{ createdAt: 'desc' }, { id: 'desc' }],
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
        groomDadName: true,
        groomMomName: true,
        brideDadName: true,
        brideMomName: true,
        hasRsvpDeadline: true,
        date: true,
        createdAt: true,
        updatedAt: true,
        photoList: { select: { id: true } },
        invitationCoverPhotoList: {
          where: { type: 'main' },
          take: 1,
          select: { croppedKey: true },
        },
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
            phone: true,
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

      // Edit lock: all conditions must be true
      const isPaid = invitation.billingStatus === 'PAID';
      const datePassedOneDay =
        isPaid && invitation.date
          ? !dayjs().startOf('day').isBefore(dayjs(invitation.date).startOf('day').add(1, 'day'))
          : false;
      const hasPhotos = (invitation.photoList?.length ?? 0) >= 1;
      const hasPlace = (invitation.placeList?.length ?? 0) >= 1;
      const hasTime = invitation.placeList.some((p) =>
        p.timeList.some((t) => t.time != null),
      );
      const hasCoupleName =
        !!invitation.groomFirstName?.trim() && !!invitation.brideFirstName?.trim();
      const hasParentName = [
        invitation.groomDadName,
        invitation.groomMomName,
        invitation.brideDadName,
        invitation.brideMomName,
      ].some((n) => n?.trim());
      const isAdmin = invitation.user?.isAdmin === true;
      const isEditLocked = isAdmin
        ? false
        : isPaid && datePassedOneDay && hasPhotos && hasPlace && hasTime && hasCoupleName && hasParentName;

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
        isEditLocked,
        mainPhotoKey: invitation.invitationCoverPhotoList[0]?.croppedKey ?? null,
        photoCount: invitation.photoList.length,
      };
    });
  }

  async getInvitationMapMarkers() {
    const places = await this.prismaService.invitationPlace.findMany({
      where: {
        place: { lat: { not: null }, lng: { not: null } },
        invitation: {
          user: { OR: [{ isAdmin: { not: true } }, { isAdmin: null }] },
        },
      },
      select: {
        place: { select: { name: true, address: true, lat: true, lng: true } },
        invitation: {
          select: {
            uniqueId: true,
            groomFirstName: true,
            brideFirstName: true,
            billingStatus: true,
            currentPlanCode: true,
            date: true,
          },
        },
      },
    });

    // Deduplicate by invitation (one marker per invitation, use first place)
    const seen = new Set<string>();
    return places
      .filter((p) => {
        const uid = p.invitation?.uniqueId;
        if (!uid || seen.has(uid)) return false;
        seen.add(uid);
        return true;
      })
      .map((p) => ({
        uniqueId: p.invitation!.uniqueId,
        coupleName: [p.invitation!.groomFirstName, p.invitation!.brideFirstName]
          .filter(Boolean)
          .join(' & '),
        billingStatus: p.invitation!.billingStatus,
        currentPlanCode: p.invitation!.currentPlanCode,
        date: p.invitation!.date,
        placeName: p.place?.name ?? null,
        address: p.place?.address ?? null,
        lat: p.place!.lat!,
        lng: p.place!.lng!,
      }));
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

  async deleteUserByAdmin(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        invitationList: {
          select: { id: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.isAdmin) {
      throw new BadRequestException('Cannot delete an admin user.');
    }

    // Delete each invitation (including S3 cleanup) first,
    // then clean up remaining FK references, then delete the user.
    let totalS3Keys = 0;
    for (const inv of user.invitationList) {
      const result = await this.deleteInvitationByAdmin(inv.id);
      totalS3Keys += result.s3KeysDeleted;
    }

    // Clean up any InvitationOrder rows referencing this user directly
    // (the userId FK has onDelete: NoAction)
    await this.prismaService.invitationOrder.deleteMany({ where: { userId } });

    await this.prismaService.user.delete({ where: { id: userId } });

    return {
      deleted: 1,
      invitationsDeleted: user.invitationList.length,
      s3KeysDeleted: totalS3Keys,
    };
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

    // Cancel any lingering PENDING orders first
    await this.prismaService.invitationOrder.updateMany({
      where: { invitationId, status: 'PENDING' },
      data: { status: 'CANCELED' },
    });

    // Find the matching price plan for the order record
    const pricePlan = isPaid && currentPlanCode
      ? await this.prismaService.pricePlan.findFirst({
          where: { code: currentPlanCode, isActive: true },
        })
      : null;

    const durationDays = pricePlan?.durationDays
      ? Number(pricePlan.durationDays)
      : null;

    await this.prismaService.invitation.update({
      where: { id: invitationId },
      data: {
        billingStatus,
        currentPlanCode: isPaid ? currentPlanCode : null,
        watermarkEnabled: !isPaid,
        accessStartedAt: isPaid ? now : null,
        accessEndsAt: isPaid && durationDays
          ? new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000)
          : null,
      },
    });

    // Create a matching InvitationOrder record when setting to PAID
    if (isPaid && currentPlanCode) {
      const rand = Math.random().toString(36).slice(2, 12).toUpperCase();
      const orderNo = `ADM-${Date.now()}-${rand}`;

      await this.prismaService.invitationOrder.create({
        data: {
          invitationId,
          userId: invitation.userId,
          pricePlanId: pricePlan?.id ?? null,
          orderNo,
          planCode: currentPlanCode,
          amountPhp: pricePlan ? Number(pricePlan.amountPhp) : 0,
          durationDays,
          status: 'PAID',
          paidAt: now,
          provider: 'admin',
        },
      });
    }

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
        // Short-lived on purpose: admins should finish the edit quickly so
        // they don't accidentally modify data while another tab is open.
        expiresIn: '10m',
      },
    );
    return { accessToken };
  }

  // ─── Theme Statistics ───
  // "Active" = PAID invitation that has been actually customized (has names,
  // a main cover photo, or any gallery photo). Computed at query time so the
  // definition lives in one place — same pattern as `isInvitationEditLocked`.
  private isInvitationActive(invitation: {
    billingStatus: string | null;
    groomFirstName: string | null;
    brideFirstName: string | null;
    invitationCoverPhotoList: Array<{ type: string }>;
    photoList: Array<{ id: number }>;
  }): boolean {
    if (invitation.billingStatus !== 'PAID') return false;
    const hasNames =
      !!invitation.groomFirstName?.trim() ||
      !!invitation.brideFirstName?.trim();
    const hasMainPhoto = invitation.invitationCoverPhotoList.some(
      (p) => p.type === 'main',
    );
    const hasGalleryPhoto = invitation.photoList.length > 0;
    return hasNames || hasMainPhoto || hasGalleryPhoto;
  }

  async getThemeStats() {
    const invitations = await this.prismaService.invitation.findMany({
      where: {
        billingStatus: 'PAID',
        user: { OR: [{ isAdmin: { not: true } }, { isAdmin: null }] },
      },
      select: {
        templateNo: true,
        baseFont: true,
        bgColor: true,
        pointColor: true,
        textColor: true,
        billingStatus: true,
        groomFirstName: true,
        brideFirstName: true,
        invitationCoverPhotoList: { select: { type: true } },
        photoList: { select: { id: true } },
      },
    });

    const active = invitations.filter((inv) => this.isInvitationActive(inv));

    const tally = <T extends string | number | null>(
      key: keyof (typeof active)[number],
      options?: { skipUnset?: boolean },
    ): Array<{ value: string; count: number }> => {
      const counts = new Map<string, number>();
      for (const inv of active) {
        const raw = inv[key] as T;
        const isUnset = raw === null || raw === undefined || raw === '';
        if (isUnset && options?.skipUnset) continue;
        const value = isUnset ? '(unset)' : String(raw);
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }
      return Array.from(counts.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count);
    };

    const topN = (
      items: Array<{ value: string; count: number }>,
      n: number,
    ) => items.slice(0, n);

    return {
      total: active.length,
      templateNo: tally('templateNo'),
      baseFont: tally('baseFont', { skipUnset: true }),
      bgColor: topN(tally('bgColor', { skipUnset: true }), 10),
      pointColor: topN(tally('pointColor', { skipUnset: true }), 10),
      textColor: topN(tally('textColor', { skipUnset: true }), 10),
    };
  }
}
