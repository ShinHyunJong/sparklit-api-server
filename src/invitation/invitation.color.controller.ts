import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import {
  CreateDressColorDto,
  DressColorType,
  UpdateDressColorDto,
  UpdateDressColorOrderDto,
} from './dto/dress-color.dto';
import { InvitationColorService } from './invitation.color.service';

@Controller('invitation/color')
export class InvitationColorController {
  constructor(
    private readonly invitationColorService: InvitationColorService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/dress/:uniqueId')
  getDressColors(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Query('type') type?: DressColorType,
  ) {
    return this.invitationColorService.getDressColors(
      uniqueId,
      req.user.id,
      type,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/dress/:uniqueId')
  addDressColor(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: CreateDressColorDto,
  ) {
    return this.invitationColorService.addDressColor(
      uniqueId,
      req.user.id,
      body.type,
      body.color,
      body.order,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/dress/:uniqueId/order')
  updateDressColorOrder(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateDressColorOrderDto,
  ) {
    return this.invitationColorService.updateDressColorOrder(
      uniqueId,
      req.user.id,
      body.colorIds,
      body.type,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/dress/:uniqueId/:colorId')
  updateDressColor(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('colorId') colorId: string,
    @Body() body: UpdateDressColorDto,
  ) {
    return this.invitationColorService.updateDressColor(
      uniqueId,
      req.user.id,
      Number(colorId),
      body.color,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/dress/:uniqueId/:colorId')
  deleteDressColor(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('colorId') colorId: string,
  ) {
    return this.invitationColorService.deleteDressColor(
      uniqueId,
      req.user.id,
      Number(colorId),
    );
  }
}
