import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateFaqDto, UpdateFaqDto, UpdateFaqOrderDto } from './dto/faq.dto';
import { InvitationFaqService } from './invitation.faq.service';

@Controller('invitation/faq')
export class InvitationFaqController {
  constructor(private readonly invitationFaqService: InvitationFaqService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:uniqueId')
  getFaqList(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.invitationFaqService.getFaqList(uniqueId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:uniqueId')
  addFaq(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: CreateFaqDto,
  ) {
    return this.invitationFaqService.addFaq(
      uniqueId,
      req.user.id,
      body.question,
      body.answer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:uniqueId/order')
  updateFaqOrder(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateFaqOrderDto,
  ) {
    return this.invitationFaqService.updateFaqOrder(
      uniqueId,
      req.user.id,
      body.faqIds,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:uniqueId/:faqId')
  updateFaq(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('faqId') faqId: string,
    @Body() body: UpdateFaqDto,
  ) {
    return this.invitationFaqService.updateFaq(
      uniqueId,
      req.user.id,
      Number(faqId),
      body.question,
      body.answer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:uniqueId/:faqId')
  deleteFaq(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('faqId') faqId: string,
  ) {
    return this.invitationFaqService.deleteFaq(
      uniqueId,
      req.user.id,
      Number(faqId),
    );
  }
}
