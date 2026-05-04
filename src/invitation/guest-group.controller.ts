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
import {
  CreateGuestGroupDto,
  LinkRsvpDto,
  UpdateGuestGroupDto,
  UpdateGuestSettingsDto,
  VerifyPasswordDto,
} from './dto/guest-group.dto';
import { GuestGroupService } from './guest-group.service';

@Controller('invitation')
export class GuestGroupController {
  constructor(private readonly guestGroupService: GuestGroupService) {}

  // ─── Public: verify password ───

  @Post(':uniqueId/verify-password')
  verifyPassword(
    @Param('uniqueId') uniqueId: string,
    @Body() body: VerifyPasswordDto,
  ) {
    return this.guestGroupService.verifyPassword(
      uniqueId,
      body.password,
      body.name,
    );
  }

  // ─── Authenticated: guest settings ───

  @Put(':uniqueId/guest-settings')
  @UseGuards(JwtAuthGuard)
  updateGuestSettings(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateGuestSettingsDto,
    @Req() req,
  ) {
    return this.guestGroupService.updateGuestSettings(
      uniqueId,
      req.user.id,
      body,
    );
  }

  // ─── Authenticated: guest group CRUD ───

  @Get(':uniqueId/guest-groups')
  @UseGuards(JwtAuthGuard)
  getGuestGroups(@Param('uniqueId') uniqueId: string, @Req() req) {
    return this.guestGroupService.getGuestGroups(uniqueId, req.user.id);
  }

  @Post(':uniqueId/guest-groups')
  @UseGuards(JwtAuthGuard)
  createGuestGroup(
    @Param('uniqueId') uniqueId: string,
    @Body() body: CreateGuestGroupDto,
    @Req() req,
  ) {
    return this.guestGroupService.createGuestGroup(
      uniqueId,
      req.user.id,
      body,
    );
  }

  @Put(':uniqueId/guest-groups/:id')
  @UseGuards(JwtAuthGuard)
  updateGuestGroup(
    @Param('uniqueId') uniqueId: string,
    @Param('id') id: string,
    @Body() body: UpdateGuestGroupDto,
    @Req() req,
  ) {
    return this.guestGroupService.updateGuestGroup(
      uniqueId,
      req.user.id,
      Number(id),
      body,
    );
  }

  @Delete(':uniqueId/guest-groups/:id')
  @UseGuards(JwtAuthGuard)
  deleteGuestGroup(
    @Param('uniqueId') uniqueId: string,
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.guestGroupService.deleteGuestGroup(
      uniqueId,
      req.user.id,
      Number(id),
    );
  }

  // ─── Authenticated: RSVP linking ───

  @Put(':uniqueId/guest-groups/:id/link-rsvp')
  @UseGuards(JwtAuthGuard)
  linkRsvp(
    @Param('uniqueId') uniqueId: string,
    @Param('id') id: string,
    @Body() body: LinkRsvpDto,
    @Req() req,
  ) {
    return this.guestGroupService.linkRsvp(
      uniqueId,
      req.user.id,
      Number(id),
      body.rsvpId,
    );
  }

  @Delete(':uniqueId/guest-groups/:id/unlink-rsvp')
  @UseGuards(JwtAuthGuard)
  unlinkRsvp(
    @Param('uniqueId') uniqueId: string,
    @Param('id') id: string,
    @Body() body: LinkRsvpDto,
    @Req() req,
  ) {
    return this.guestGroupService.unlinkRsvp(
      uniqueId,
      req.user.id,
      Number(id),
      body.rsvpId,
    );
  }

  // ─── Authenticated: seating tables ───

  @Get(':uniqueId/seating-tables')
  @UseGuards(JwtAuthGuard)
  getSeatingTables(@Param('uniqueId') uniqueId: string, @Req() req) {
    return this.guestGroupService.getSeatingTables(uniqueId, req.user.id);
  }

  @Post(':uniqueId/seating-tables')
  @UseGuards(JwtAuthGuard)
  createSeatingTable(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { name: string; capacity: number },
    @Req() req,
  ) {
    return this.guestGroupService.createSeatingTable(
      uniqueId,
      req.user.id,
      body,
    );
  }

  @Put(':uniqueId/seating-tables/:id')
  @UseGuards(JwtAuthGuard)
  updateSeatingTable(
    @Param('uniqueId') uniqueId: string,
    @Param('id') id: string,
    @Body() body: { name?: string; capacity?: number },
    @Req() req,
  ) {
    return this.guestGroupService.updateSeatingTable(
      uniqueId,
      req.user.id,
      Number(id),
      body,
    );
  }

  @Delete(':uniqueId/seating-tables/:id')
  @UseGuards(JwtAuthGuard)
  deleteSeatingTable(
    @Param('uniqueId') uniqueId: string,
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.guestGroupService.deleteSeatingTable(
      uniqueId,
      req.user.id,
      Number(id),
    );
  }

  @Post(':uniqueId/seating-tables/:id/assign')
  @UseGuards(JwtAuthGuard)
  assignSeat(
    @Param('uniqueId') uniqueId: string,
    @Param('id') id: string,
    @Body() body: { guestGroupId: number; seatNumber?: number },
    @Req() req,
  ) {
    return this.guestGroupService.assignSeat(
      uniqueId,
      req.user.id,
      Number(id),
      body.guestGroupId,
      body.seatNumber,
    );
  }

  @Delete(':uniqueId/seating-tables/:id/assign/:guestGroupId')
  @UseGuards(JwtAuthGuard)
  unassignSeat(
    @Param('uniqueId') uniqueId: string,
    @Param('id') id: string,
    @Param('guestGroupId') guestGroupId: string,
    @Req() req,
  ) {
    return this.guestGroupService.unassignSeat(
      uniqueId,
      req.user.id,
      Number(id),
      Number(guestGroupId),
    );
  }
}
