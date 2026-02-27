import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { GOOGLE_PLACES_API_KEY } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

type GooglePlaceDetailsResponse = {
  status: string;
  result?: {
    formatted_address?: string;
    name?: string;
    geometry?: {
      location?: { lat?: number; lng?: number };
    };
  };
  error_message?: string;
};

const DETAILS_BASE_URL =
  'https://maps.googleapis.com/maps/api/place/details/json';

type RefreshPlaceAddressParams = {
  apply: boolean;
  limit?: number;
};

type CreateFakePaidInvitationOrderParams = {
  apply: boolean;
  limit?: number;
};

@Injectable()
export class MigrationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  private async fetchPlaceDetails(placeId: string) {
    const params = {
      place_id: placeId,
      key: GOOGLE_PLACES_API_KEY,
      language: 'en',
      fields: 'formatted_address,name,geometry',
    };

    const response = await lastValueFrom(
      this.httpService.get<GooglePlaceDetailsResponse>(DETAILS_BASE_URL, {
        params,
      }),
    );

    const data = response.data;
    if (data.status !== 'OK') {
      const message = data.error_message
        ? `${data.status}: ${data.error_message}`
        : data.status;
      throw new Error(message);
    }

    return {
      address: data.result?.formatted_address ?? '',
      name: data.result?.name ?? '',
      lat: data.result?.geometry?.location?.lat ?? null,
      lng: data.result?.geometry?.location?.lng ?? null,
    };
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async refreshPlaceAddress({ apply, limit }: RefreshPlaceAddressParams) {
    if (!GOOGLE_PLACES_API_KEY) {
      throw new Error('GOOGLE_PLACES_API_KEY is missing.');
    }

    const places = await this.prismaService.place.findMany({
      where: {
        AND: [
          { googlePlaceId: { not: null } },
          { NOT: { googlePlaceId: { startsWith: 'manual' } } },
        ],
      },
      select: { id: true, googlePlaceId: true, address: true },
      ...(limit ? { take: limit } : {}),
    });

    const result = {
      total: places.length,
      updated: 0,
      skipped: 0,
      failed: 0,
      items: [] as Array<{
        id: number;
        googlePlaceId: string;
        address: string;
      }>,
    };

    for (const place of places) {
      if (!place.googlePlaceId) {
        result.skipped += 1;
        continue;
      }

      try {
        const { address, name, lat, lng } = await this.fetchPlaceDetails(
          place.googlePlaceId,
        );
        if (!address) {
          result.skipped += 1;
          continue;
        }

        if (apply) {
          await this.prismaService.place.update({
            where: { id: place.id },
            data: {
              address,
              ...(name ? { name } : {}),
              ...(lat !== null ? { lat } : {}),
              ...(lng !== null ? { lng } : {}),
            },
          });
        }

        result.updated += 1;
        result.items.push({
          id: place.id,
          googlePlaceId: place.googlePlaceId,
          address,
        });
      } catch {
        result.failed += 1;
      }

      await this.sleep(120);
    }

    return result;
  }

  private createOrderNo() {
    const random = Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0');
    return `SPK-${random}`;
  }

  async createFakePaidInvitationOrder({
    apply,
    limit,
  }: CreateFakePaidInvitationOrderParams) {
    const invitationList = await this.prismaService.invitation.findMany({
      where: { userId: { not: null } },
      select: {
        id: true,
        userId: true,
      },
      orderBy: [{ id: 'asc' }],
      ...(limit ? { take: limit } : {}),
    });

    const existingOrderList = await this.prismaService.invitationOrder.findMany({
      where: {
        invitationId: {
          in: invitationList.map((invitation) => invitation.id),
        },
      },
      select: { invitationId: true },
    });
    const invitationIdWithOrderSet = new Set(
      existingOrderList.map((order) => order.invitationId),
    );

    const result = {
      total: invitationList.length,
      created: 0,
      updatedInvitation: 0,
      skipped: 0,
      failed: 0,
      items: [] as Array<{
        invitationId: number;
        userId: number | null;
        orderNo: string;
      }>,
    };

    for (const invitation of invitationList) {
      if (!invitation.userId) {
        result.skipped += 1;
        continue;
      }
      if (invitationIdWithOrderSet.has(invitation.id)) {
        result.skipped += 1;
        continue;
      }

      try {
        const orderNo = this.createOrderNo();

        if (apply) {
          await this.prismaService.$transaction(async (tx) => {
            await tx.invitationOrder.create({
              data: {
                invitationId: invitation.id,
                userId: invitation.userId,
                pricePlanId: 2,
                orderNo,
                planCode: 'HEIRLOOM',
                amountPhp: 2499,
                currency: 'PHP',
                status: 'PAID',
                provider: 'sparklit',
                paidAt: new Date(),
              },
            });

            await tx.invitation.update({
              where: { id: invitation.id },
              data: {
                billingStatus: 'PAID',
              },
            });
          });
        }

        result.created += 1;
        result.updatedInvitation += 1;
        result.items.push({
          invitationId: invitation.id,
          userId: invitation.userId,
          orderNo,
        });
      } catch {
        result.failed += 1;
      }
    }

    return result;
  }
}
