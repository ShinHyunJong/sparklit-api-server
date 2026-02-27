import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const excludedUserIdList = [1, 2];

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
        where: { userId: { notIn: excludedUserIdList } },
      }),
      this.prismaService.invitationPlace.count({
        where: { invitation: { userId: { notIn: excludedUserIdList } } },
      }),
      this.prismaService.invitationPhoto.count({
        where: {
          Invitation: {
            is: {
              userId: { notIn: excludedUserIdList },
            },
          },
        },
      }),
      this.prismaService.invitationRSVP.count({
        where: { invitation: { userId: { notIn: excludedUserIdList } } },
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
      where: { userId: { notIn: excludedUserIdList } },
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
        invitation.currentPlanCode ?? invitation.InvitationOrder[0]?.planCode ?? null;

      const { placeList, InvitationOrder, ...rest } = invitation;
      return {
        ...rest,
        planCode,
        firstPlaceTime,
      };
    });
  }

  async getInvitationRsvpList(uniqueId: string) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: {
        uniqueId,
        userId: { notIn: excludedUserIdList },
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
