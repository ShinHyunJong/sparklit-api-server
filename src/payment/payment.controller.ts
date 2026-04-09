import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { CancelOrderDto } from './dto/cancel-order.dto';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('price-plan')
  getPricePlans() {
    return this.paymentService.getActivePricePlans();
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  createCheckout(
    @Req() req: Request & { user: { id: number } },
    @Body() body: CreateCheckoutDto,
  ) {
    return this.paymentService.createCheckoutSession(
      req.user.id,
      body.invitationId,
      body.planCode,
      body.frontendOrigin ?? req.headers.origin,
    );
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Body() body: Record<string, unknown>,
    @Headers('paymongo-signature') paymongoSignature?: string,
    @Headers('x-paymongo-signature') xPaymongoSignature?: string,
  ) {
    const rawBody = req.rawBody?.toString('utf8') ?? JSON.stringify(body);
    const signature = paymongoSignature ?? xPaymongoSignature;
    await this.paymentService.handleWebhookEvent(body, rawBody, signature);
    return { received: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('cancel')
  cancelOrder(
    @Req() req: Request & { user: { id: number } },
    @Body() body: CancelOrderDto,
  ) {
    return this.paymentService.handleCancelRedirect(body.orderNo, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('upgrade-info')
  getUpgradeInfo(
    @Req() req: Request & { user: { id: number } },
  ) {
    const invitationId = Number(
      (req.query as Record<string, string>).invitationId,
    );
    return this.paymentService.getUpgradeInfo(req.user.id, invitationId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upgrade')
  createUpgrade(
    @Req() req: Request & { user: { id: number } },
    @Body() body: { invitationId: number; frontendOrigin?: string },
  ) {
    return this.paymentService.createUpgradeCheckoutSession(
      req.user.id,
      body.invitationId,
      body.frontendOrigin ?? req.headers.origin,
    );
  }
}
