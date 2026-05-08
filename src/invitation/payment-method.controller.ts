import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from './dto/payment-method.dto';
import { PaymentMethodService } from './payment-method.service';

@Controller('invitation/:uniqueId/payment-methods')
export class PaymentMethodController {
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
  ) {}

  // ─── Public list (no auth) — for the public invitation view ───
  @Get('/public')
  listPublic(@Param('uniqueId') uniqueId: string) {
    return this.paymentMethodService.listPublic(uniqueId);
  }

  // ─── Authenticated CRUD ───

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.paymentMethodService.list(uniqueId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: CreatePaymentMethodDto,
  ) {
    return this.paymentMethodService.create(uniqueId, req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':methodId')
  update(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('methodId', ParseIntPipe) methodId: number,
    @Body() body: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(
      uniqueId,
      req.user.id,
      methodId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':methodId')
  delete(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('methodId', ParseIntPipe) methodId: number,
  ) {
    return this.paymentMethodService.delete(uniqueId, req.user.id, methodId);
  }

  // ─── QR upload / delete ───

  @UseGuards(JwtAuthGuard)
  @Put(':methodId/qr')
  @FormDataRequest({ storage: MemoryStoredFile })
  uploadQr(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('methodId', ParseIntPipe) methodId: number,
    @Body() { file }: { file: MemoryStoredFile },
  ) {
    return this.paymentMethodService.uploadQr(
      uniqueId,
      req.user.id,
      methodId,
      file,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':methodId/qr')
  deleteQr(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('methodId', ParseIntPipe) methodId: number,
  ) {
    return this.paymentMethodService.deleteQr(
      uniqueId,
      req.user.id,
      methodId,
    );
  }
}
