import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import cryptoRandomString from 'crypto-random-string';
import { lastValueFrom } from 'rxjs';
import { createHmac, timingSafeEqual } from 'crypto';
import { Prisma } from '../../generated/prisma/client';

import {
  PAYMENT_CANCEL_URL,
  PAYMENT_SUCCESS_URL,
  PAYMONGO_SECRET_KEY,
  PAYMONGO_WEBHOOK_SECRET,
} from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { postSlackPaymentWebhookMessage } from 'src/utils/slack.util';

import { PlanCode } from './dto/create-checkout.dto';

type PaymongoCheckoutResponse = {
  data?: {
    id?: string;
    attributes?: {
      checkout_url?: string;
    };
  };
};

type GenericObject = Record<string, unknown>;
type PricePlanRow = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  amountPhp: number;
  currency: string;
  durationDays: number | null;
  isActive: number;
  displayOrder: number;
};

@Injectable()
export class PaymentService {
  private readonly paymongoCheckoutUrl =
    'https://api.paymongo.com/v1/checkout_sessions';

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private getPlanPricing(planCode: PlanCode) {
    return this.prismaService.$queryRawUnsafe<PricePlanRow[]>(
      `
      SELECT
        id,
        code,
        name,
        description,
        amountPhp,
        currency,
        durationDays,
        isActive,
        displayOrder
      FROM PricePlan
      WHERE code = ? AND isActive = 1
      LIMIT 1
      `,
      planCode,
    );
  }

  private generateOrderNo() {
    const rand = cryptoRandomString({ length: 10, type: 'alphanumeric' });
    return `SPK-${Date.now()}-${rand}`.toUpperCase();
  }

  private getSignatureMap(signatureHeader: string) {
    return signatureHeader
      .split(',')
      .reduce<Record<string, string>>((acc, kv) => {
        const [key, ...rest] = kv.trim().split('=');
        if (!key || rest.length === 0) return acc;
        acc[key] = rest.join('=');
        return acc;
      }, {});
  }

  private verifyWebhookSignature(rawBody: string, signatureHeader?: string) {
    if (!PAYMONGO_WEBHOOK_SECRET) {
      throw new InternalServerErrorException('PAYMONGO_WEBHOOK_SECRET missing');
    }
    if (!signatureHeader) {
      throw new UnauthorizedException('Missing webhook signature');
    }

    const signatureMap = this.getSignatureMap(signatureHeader);
    const timestamp = signatureMap.t;
    const webhookSignature =
      signatureMap.li ?? signatureMap.te ?? signatureMap.v1;

    if (!timestamp || !webhookSignature) {
      throw new UnauthorizedException('Invalid webhook signature format');
    }

    const payloadToSign = `${timestamp}.${rawBody}`;
    const expected = createHmac('sha256', PAYMONGO_WEBHOOK_SECRET)
      .update(payloadToSign)
      .digest('hex');

    const expectedBuffer = Buffer.from(expected, 'utf8');
    const providedBuffer = Buffer.from(webhookSignature, 'utf8');
    if (expectedBuffer.length !== providedBuffer.length) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    if (!timingSafeEqual(expectedBuffer, providedBuffer)) {
      throw new UnauthorizedException('Invalid webhook signature');
    }
  }

  private findOrderNoFromPayload(payload: GenericObject): string | null {
    const stack: unknown[] = [payload];
    while (stack.length > 0) {
      const current = stack.pop();
      if (!current || typeof current !== 'object') continue;
      const currentObj = current as GenericObject;
      const metadata = currentObj.metadata;
      if (metadata && typeof metadata === 'object') {
        const value = (metadata as GenericObject).orderNo;
        if (typeof value === 'string' && value.trim()) {
          return value.trim();
        }
      }
      Object.values(currentObj).forEach((value) => {
        if (value && typeof value === 'object') {
          stack.push(value);
        }
      });
    }
    return null;
  }

  private async notifyWebhookToSlack(input: {
    eventType: string;
    eventId: string | null;
    orderNo: string;
    planCode: string;
    amountPhp: number;
    status: string;
    invitationId: number;
    userId: number;
  }) {
    const eventId = input.eventId ? input.eventId : '-';
    const message = [
      '*PayMongo Webhook*',
      'Event: ' + input.eventType,
      'Order: ' + input.orderNo,
      'Status: ' + input.status,
      'Plan: ' + input.planCode,
      'Amount: PHP ' + input.amountPhp,
      'Invitation ID: ' + input.invitationId,
      'User ID: ' + input.userId,
      'Event ID: ' + eventId,
      'At: ' + new Date().toISOString(),
    ].join('\n');

    await postSlackPaymentWebhookMessage(message);
  }

  async handleWebhookEvent(
    payload: GenericObject,
    rawBody: string,
    signatureHeader?: string,
  ) {
    this.verifyWebhookSignature(rawBody, signatureHeader);

    const eventRoot = payload?.data as GenericObject | undefined;
    const eventId = typeof eventRoot?.id === 'string' ? eventRoot.id : null;
    const eventType = eventRoot?.attributes
      ? (eventRoot.attributes as GenericObject).type
      : null;

    if (typeof eventType !== 'string' || !eventType) {
      throw new BadRequestException('Invalid webhook event type');
    }

    const orderNo = this.findOrderNoFromPayload(payload);
    if (!orderNo) {
      return { ignored: true };
    }

    const order = await this.prismaService.invitationOrder.findUnique({
      where: { orderNo },
      include: { Invitation: true },
    });
    if (!order) {
      return { ignored: true };
    }

    const paidEvent =
      eventType === 'checkout_session.payment.paid' ||
      eventType === 'payment.paid';
    const failedEvent =
      eventType === 'checkout_session.payment.failed' ||
      eventType === 'payment.failed' ||
      eventType === 'payment.canceled';

    let finalStatus = order.status;
    let shouldNotifySlack = false;

    await this.prismaService.$transaction(async (tx) => {
      if (paidEvent) {
        if (order.status === 'PAID') {
          return;
        }

        const now = new Date();
        const accessEndsAt = order.durationDays
          ? new Date(now.getTime() + order.durationDays * 24 * 60 * 60 * 1000)
          : null;

        await tx.invitationOrder.update({
          where: { id: order.id },
          data: {
            status: 'PAID',
            paidAt: now,
            providerEventId: eventId,
            rawPayload: payload as Prisma.InputJsonValue,
          },
        });

        await tx.invitation.update({
          where: { id: order.invitationId },
          data: {
            billingStatus: 'PAID',
            watermarkEnabled: false,
            currentPlanCode: order.planCode,
            accessStartedAt: now,
            accessEndsAt,
          },
        });
        finalStatus = 'PAID';
        shouldNotifySlack = true;
        return;
      }

      if (failedEvent) {
        if (order.status !== 'PAID') {
          await tx.invitationOrder.update({
            where: { id: order.id },
            data: {
              status: 'FAILED',
              providerEventId: eventId,
              rawPayload: payload as Prisma.InputJsonValue,
            },
          });
          finalStatus = 'FAILED';
          shouldNotifySlack = true;
        }
        return;
      }

      await tx.invitationOrder.update({
        where: { id: order.id },
        data: {
          providerEventId: eventId,
          rawPayload: payload as Prisma.InputJsonValue,
        },
      });
    });

    if (!shouldNotifySlack) {
      return { ok: true, skippedSlack: true };
    }

    await this.notifyWebhookToSlack({
      eventType,
      eventId,
      orderNo: order.orderNo,
      planCode: order.planCode,
      amountPhp: order.amountPhp,
      status: finalStatus,
      invitationId: order.invitationId,
      userId: order.userId,
    });

    return { ok: true };
  }

  async createCheckoutSession(
    userId: number,
    invitationId: number,
    planCode: PlanCode,
  ) {
    if (!PAYMONGO_SECRET_KEY) {
      throw new InternalServerErrorException('PAYMONGO_SECRET_KEY missing');
    }

    const invitation = await this.prismaService.invitation.findFirst({
      where: {
        id: invitationId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!invitation) {
      throw new BadRequestException('Invitation not found');
    }

    const pricePlanList = await this.getPlanPricing(planCode);
    const pricePlan = pricePlanList[0];
    if (!pricePlan) {
      throw new BadRequestException('Price plan not found');
    }

    const amountPhp = Number(pricePlan.amountPhp);
    const durationDays =
      pricePlan.durationDays == null ? null : Number(pricePlan.durationDays);
    const orderNo = this.generateOrderNo();

    const order = await this.prismaService.$transaction(async (tx) => {
      const created = await tx.invitationOrder.create({
        data: {
          invitationId: invitation.id,
          userId,
          pricePlanId: Number(pricePlan.id),
          orderNo,
          planCode,
          amountPhp,
          durationDays,
          status: 'PENDING',
        },
      });

      await tx.invitation.update({
        where: { id: invitation.id },
        data: {
          billingStatus: 'PENDING',
        },
      });

      return created;
    });

    const authValue = Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64');
    const paymongoPayload = {
      data: {
        attributes: {
          billing: {},
          send_email_receipt: false,
          show_description: true,
          show_line_items: true,
          description: `Sparklit ${planCode} Plan`,
          payment_method_types: ['gcash', 'card', 'qrph'],
          success_url: `${PAYMENT_SUCCESS_URL}?orderNo=${orderNo}`,
          cancel_url: `${PAYMENT_CANCEL_URL}?orderNo=${orderNo}`,
          metadata: {
            orderNo,
            invitationId: String(invitation.id),
            userId: String(userId),
          },
          line_items: [
            {
              currency: 'PHP',
              amount: amountPhp * 100,
              name: `Sparklit ${planCode}`,
              quantity: 1,
            },
          ],
        },
      },
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post<PaymongoCheckoutResponse>(
          this.paymongoCheckoutUrl,
          paymongoPayload,
          {
            headers: {
              Authorization: `Basic ${authValue}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const checkoutUrl = response.data?.data?.attributes?.checkout_url;
      const providerPaymentId = response.data?.data?.id ?? null;

      if (!checkoutUrl) {
        throw new InternalServerErrorException('Checkout URL not found');
      }

      await this.prismaService.invitationOrder.update({
        where: { id: order.id },
        data: {
          providerPaymentId,
          rawPayload: response.data as object,
        },
      });

      return {
        orderNo: order.orderNo,
        checkoutUrl,
      };
    } catch (error) {
      await this.prismaService.invitationOrder.update({
        where: { id: order.id },
        data: {
          status: 'FAILED',
        },
      });

      throw new InternalServerErrorException('Failed to create checkout');
    }
  }

  async getActivePricePlans() {
    const planList = await this.prismaService.$queryRawUnsafe<PricePlanRow[]>(
      `
      SELECT
        id,
        code,
        name,
        description,
        amountPhp,
        currency,
        durationDays,
        isActive,
        displayOrder
      FROM PricePlan
      WHERE isActive = 1
      ORDER BY displayOrder ASC, id ASC
      `,
    );

    return planList.map((plan) => ({
      id: Number(plan.id),
      code: plan.code,
      name: plan.name,
      description: plan.description,
      amountPhp: Number(plan.amountPhp),
      currency: plan.currency,
      durationDays:
        plan.durationDays == null ? null : Number(plan.durationDays),
      displayOrder: Number(plan.displayOrder),
    }));
  }

  async handleCancelRedirect(orderNo: string) {
    const trimmedOrderNo = orderNo.trim();
    if (!trimmedOrderNo) {
      throw new BadRequestException('orderNo is required');
    }

    const order = await this.prismaService.invitationOrder.findUnique({
      where: { orderNo: trimmedOrderNo },
      select: {
        id: true,
        invitationId: true,
        status: true,
      },
    });

    if (!order) {
      return { updated: false, reason: 'not_found' };
    }

    if (order.status === 'PAID') {
      return { updated: false, reason: 'already_paid' };
    }

    if (order.status === 'CANCELED') {
      return { updated: false, reason: 'already_canceled' };
    }

    await this.prismaService.$transaction(async (tx) => {
      await tx.invitationOrder.update({
        where: { id: order.id },
        data: {
          status: 'CANCELED',
        },
      });

      const paidOrderCount = await tx.invitationOrder.count({
        where: {
          invitationId: order.invitationId,
          status: 'PAID',
        },
      });

      if (paidOrderCount === 0) {
        await tx.invitation.update({
          where: { id: order.invitationId },
          data: {
            billingStatus: 'TRIAL',
            watermarkEnabled: true,
            currentPlanCode: null,
            accessStartedAt: null,
            accessEndsAt: null,
          },
        });
      }
    });

    return { updated: true };
  }
}
