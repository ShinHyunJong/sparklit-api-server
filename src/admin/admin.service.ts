import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

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
        where: { user: { is: { isAdmin: { not: true } } } },
      }),
      this.prismaService.invitationPlace.count({
        where: { invitation: { user: { is: { isAdmin: { not: true } } } } },
      }),
      this.prismaService.invitationPhoto.count({
        where: {
          Invitation: {
            is: {
              user: { is: { isAdmin: { not: true } } },
            },
          },
        },
      }),
      this.prismaService.invitationRSVP.count({
        where: { invitation: { user: { is: { isAdmin: { not: true } } } } },
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
      where: { user: { is: { isAdmin: { not: true } } } },
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
        InvitationOrder: {
          where: { status: 'PAID' },
          orderBy: [{ paidAt: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
          take: 1,
          select: {
            planCode: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            country: true,
          },
        },
      },
    });

    return invitationList.map((invitation) => {
      const firstPlaceTime =
        invitation.placeList
          .flatMap((place) => place.timeList)
          .find((timeItem) => timeItem.time)?.time ?? null;
      const planCode =
        invitation.currentPlanCode ??
        invitation.InvitationOrder[0]?.planCode ??
        null;

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
        planCode,
        firstPlaceTime,
      };
    });
  }

  async getInvitationRsvpList(uniqueId: string) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: {
        uniqueId,
        user: { is: { isAdmin: { not: true } } },
      },
      select: {
        id: true,
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
}
