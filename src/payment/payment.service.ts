import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
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
  private readonly logger = new Logger(PaymentService.name);

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

  private resolveRedirectUrl(input: {
    frontendOrigin?: string;
    fallbackUrl: string;
    path: '/payment/success' | '/payment/cancel';
    orderNo: string;
  }) {
    const fallback = new URL(input.fallbackUrl);
    fallback.searchParams.set('orderNo', input.orderNo);

    if (!input.frontendOrigin) {
      return fallback.toString();
    }

    try {
      const originUrl = new URL(input.frontendOrigin);
      if (originUrl.protocol !== 'http:' && originUrl.protocol !== 'https:') {
        return fallback.toString();
      }

      const resolved = new URL(input.path, originUrl.origin);
      resolved.searchParams.set('orderNo', input.orderNo);
      return resolved.toString();
    } catch {
      return fallback.toString();
    }
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
    invitationAlias?: string | null;
    userId: number;
    userName?: string | null;
    userEmail?: string | null;
  }) {
    const eventId = input.eventId ?? '-';
    const userName = input.userName?.trim() || '-';
    const userEmail = input.userEmail?.trim() || '-';
    const amountLabel = `\u20b1${input.amountPhp.toLocaleString('en-PH')}`;
    const invitationAlias = input.invitationAlias?.trim() || '';
    const invitationUrl = invitationAlias
      ? `https://sparklit.co/${encodeURIComponent(invitationAlias)}`
      : null;
    const invitationLink = invitationUrl
      ? `<${invitationUrl}|View Inviation>`
      : '-';
    const processedAtKst = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());

    await postSlackPaymentWebhookMessage({
      text: `New invitation payment received (${amountLabel}).`,
      attachments: [
        {
          color: '#faa708',
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `New invitation payment received (${amountLabel})`,
              },
            },
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: `*User Label*\n*${userName}*`,
                },
                {
                  type: 'mrkdwn',
                  text: `*User Email*\n${userEmail}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Order No*\n${input.orderNo}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Plan*\n${input.planCode}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Amount*\n${amountLabel}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Status*\n${input.status}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Invitation*\n${invitationLink}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*User ID*\n${input.userId}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Event Type*\n${input.eventType}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Event ID*\n${eventId}`,
                },
              ],
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `Processed at ${processedAtKst} (KST)`,
                },
              ],
            },
          ],
        },
      ],
    });
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
      include: { Invitation: true, User: true },
    });
    if (!order) {
      return { ignored: true };
    }

    const paidEvent = eventType === 'payment.paid';
    const failedEvent =
      eventType === 'checkout_session.payment.failed' ||
      eventType === 'payment.failed' ||
      eventType === 'payment.canceled';

    let finalStatus = order.status;
    let shouldNotifySlack = false;

    await this.prismaService.$transaction(async (tx) => {
      if (paidEvent) {
        // Only accept paid events for orders still in PENDING state.
        // This prevents late-arriving webhooks from reactivating CANCELED/FAILED orders.
        if (order.status !== 'PENDING') {
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
      invitationAlias: order.Invitation?.uniqueId,
      userId: order.userId,
      userName: order.User?.email ? order.User.email.split('@')[0] : null,
      userEmail: order.User?.email,
    });

    return { ok: true };
  }

  async createCheckoutSession(
    userId: number,
    invitationId: number,
    planCode: PlanCode,
    frontendOrigin?: string,
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
        billingStatus: true,
        brideFirstName: true,
        groomFirstName: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!invitation) {
      throw new BadRequestException('Invitation not found');
    }

    if (invitation.billingStatus === 'PAID') {
      throw new BadRequestException(
        'This invitation has already been paid. Use the upgrade flow if you want to change plans.',
      );
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

    const successUrl = this.resolveRedirectUrl({
      frontendOrigin,
      fallbackUrl: PAYMENT_SUCCESS_URL,
      path: '/payment/success',
      orderNo,
    });
    const cancelUrl = this.resolveRedirectUrl({
      frontendOrigin,
      fallbackUrl: PAYMENT_CANCEL_URL,
      path: '/payment/cancel',
      orderNo,
    });

    this.logger.log(
      JSON.stringify({
        event: 'createCheckoutRedirectUrl',
        orderNo,
        frontendOrigin: frontendOrigin ?? null,
        successUrl,
        cancelUrl,
      }),
    );

    const authValue = Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64');
    const billingName = [
      invitation.groomFirstName?.trim(),
      invitation.brideFirstName?.trim(),
    ]
      .filter(Boolean)
      .join(' & ');
    const billingEmail = invitation.user?.email?.trim() || '';
    const paymongoPayload = {
      data: {
        attributes: {
          billing: {
            ...(billingName ? { name: billingName } : {}),
            ...(billingEmail ? { email: billingEmail } : {}),
          },
          send_email_receipt: false,
          show_description: true,
          show_line_items: true,
          description: `Sparklit ${planCode} Plan`,
          payment_method_types: ['gcash', 'card', 'qrph'],
          success_url: successUrl,
          cancel_url: cancelUrl,
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

  async handleCancelRedirect(orderNo: string, userId: number) {
    const trimmedOrderNo = orderNo.trim();
    if (!trimmedOrderNo) {
      throw new BadRequestException('orderNo is required');
    }

    const order = await this.prismaService.invitationOrder.findUnique({
      where: { orderNo: trimmedOrderNo },
      select: {
        id: true,
        invitationId: true,
        userId: true,
        status: true,
      },
    });

    if (!order) {
      return { updated: false, reason: 'not_found' };
    }

    if (order.userId !== userId) {
      throw new UnauthorizedException('You do not own this order');
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

  async getUpgradeInfo(userId: number, invitationId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: { id: invitationId, userId },
      select: {
        billingStatus: true,
        currentPlanCode: true,
      },
    });

    if (!invitation) {
      throw new BadRequestException('Invitation not found');
    }
    if (
      invitation.billingStatus !== 'PAID' ||
      invitation.currentPlanCode !== 'STANDARD'
    ) {
      throw new BadRequestException(
        'Upgrade only available for active Standard plans',
      );
    }

    const [standardRows, premiumRows] = await Promise.all([
      this.getPlanPricing('STANDARD' as PlanCode),
      this.getPlanPricing('PREMIUM' as PlanCode),
    ]);
    const standardPlan = standardRows[0];
    const premiumPlan = premiumRows[0];
    if (!standardPlan || !premiumPlan) {
      throw new BadRequestException('Price plan not found');
    }

    const standardAmount = Number(standardPlan.amountPhp);
    const premiumAmount = Number(premiumPlan.amountPhp);
    const differentialAmount = premiumAmount - standardAmount;

    return {
      standardAmount,
      premiumAmount,
      differentialAmount,
      premiumPlanName: premiumPlan.name,
    };
  }

  async createUpgradeCheckoutSession(
    userId: number,
    invitationId: number,
    frontendOrigin?: string,
  ) {
    if (!PAYMONGO_SECRET_KEY) {
      throw new InternalServerErrorException('PAYMONGO_SECRET_KEY missing');
    }

    const invitation = await this.prismaService.invitation.findFirst({
      where: { id: invitationId, userId },
      select: {
        id: true,
        billingStatus: true,
        currentPlanCode: true,
        brideFirstName: true,
        groomFirstName: true,
        user: { select: { email: true } },
      },
    });

    if (!invitation) {
      throw new BadRequestException('Invitation not found');
    }
    if (
      invitation.billingStatus !== 'PAID' ||
      invitation.currentPlanCode !== 'STANDARD'
    ) {
      throw new BadRequestException(
        'Upgrade only available for active Standard plans',
      );
    }

    // Prevent duplicate pending upgrade orders for the same invitation.
    const existingPendingUpgrade =
      await this.prismaService.invitationOrder.findFirst({
        where: {
          invitationId: invitation.id,
          status: 'PENDING',
          planCode: 'PREMIUM',
        },
        select: { id: true },
      });
    if (existingPendingUpgrade) {
      throw new BadRequestException(
        'An upgrade checkout is already in progress. Please complete or cancel it first.',
      );
    }

    const [standardRows, premiumRows] = await Promise.all([
      this.getPlanPricing('STANDARD' as PlanCode),
      this.getPlanPricing('PREMIUM' as PlanCode),
    ]);
    const standardPlan = standardRows[0];
    const premiumPlan = premiumRows[0];
    if (!standardPlan || !premiumPlan) {
      throw new BadRequestException('Price plan not found');
    }

    const differentialAmount =
      Number(premiumPlan.amountPhp) - Number(standardPlan.amountPhp);
    if (differentialAmount <= 0) {
      throw new BadRequestException('Invalid upgrade pricing');
    }

    const durationDays =
      premiumPlan.durationDays == null ? null : Number(premiumPlan.durationDays);
    const orderNo = this.generateOrderNo();

    const order = await this.prismaService.invitationOrder.create({
      data: {
        invitationId: invitation.id,
        userId,
        pricePlanId: Number(premiumPlan.id),
        orderNo,
        planCode: 'PREMIUM',
        amountPhp: differentialAmount,
        durationDays,
        status: 'PENDING',
      },
    });

    const successUrl = this.resolveRedirectUrl({
      frontendOrigin,
      fallbackUrl: PAYMENT_SUCCESS_URL,
      path: '/payment/success',
      orderNo,
    });
    const cancelUrl = this.resolveRedirectUrl({
      frontendOrigin,
      fallbackUrl: PAYMENT_CANCEL_URL,
      path: '/payment/cancel',
      orderNo,
    });

    const authValue = Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64');
    const billingName = [
      invitation.groomFirstName?.trim(),
      invitation.brideFirstName?.trim(),
    ]
      .filter(Boolean)
      .join(' & ');
    const billingEmail = invitation.user?.email?.trim() || '';

    const paymongoPayload = {
      data: {
        attributes: {
          billing: {
            ...(billingName ? { name: billingName } : {}),
            ...(billingEmail ? { email: billingEmail } : {}),
          },
          send_email_receipt: false,
          show_description: true,
          show_line_items: true,
          description: 'Sparklit PREMIUM Upgrade',
          payment_method_types: ['gcash', 'card', 'qrph'],
          success_url: successUrl,
          cancel_url: cancelUrl,
          metadata: {
            orderNo,
            invitationId: String(invitation.id),
            userId: String(userId),
          },
          line_items: [
            {
              currency: 'PHP',
              amount: differentialAmount * 100,
              name: 'Sparklit PREMIUM Upgrade',
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
        data: { status: 'FAILED' },
      });
      throw error;
    }
  }
}
