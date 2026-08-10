import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  UpdateInvitationDto,
  UpdateMainPhotoDto,
} from './dto/update-invitation.dto';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { RsvpDto, UpdateRsvpDto } from './dto/rsvp.dto';
import { CheckUniqueIdDto, UpdateUniqueIdDto } from './dto/unique-id.dto';
import { UpdateInvitationMetaDto } from './dto/update-meta.dto';
import { UpdateEntourageDto } from './dto/update-entourage.dto';
import { UpdateSponsorListDto } from './dto/update-sponsor-list.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req) {
    return this.invitationService.create(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.invitationService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/uniqueId/check')
  checkUniqueId(@Query() query: CheckUniqueIdDto) {
    return this.invitationService.checkUniqueIdAvailability(
      query.value,
      query.currentUniqueId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/uniqueId/:uniqueId')
  updateUniqueId(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateUniqueIdDto,
  ) {
    return this.invitationService.updateUniqueId(
      uniqueId,
      body.newUniqueId,
      req.user.id,
    );
  }

  @Get('samples')
  getSamples(@Query('ids') ids: string) {
    const uniqueIds = ids?.split(',').filter(Boolean) ?? [];
    return this.invitationService.getSamplePreviews(uniqueIds);
  }

  @Get(':uniqueId')
  findOne(@Param('uniqueId') uniqueId: string) {
    return this.invitationService.findOne(uniqueId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uniqueId')
  deleteInvitation(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.invitationService.deleteInvitation(uniqueId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':uniqueId')
  update(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() updateInvitationDto: UpdateInvitationDto,
  ) {
    return this.invitationService.updateInvitation(
      uniqueId,
      req.user.id,
      updateInvitationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/greeting/:uniqueId')
  updateGreeting(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body()
    { title, content }: { title: string; content: string },
  ) {
    return this.invitationService.updateGreeting(
      uniqueId,
      req.user.id,
      title,
      content,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/music/upload/:invitationId')
  @FormDataRequest({ storage: MemoryStoredFile })
  uploadMusic(
    @Req() req,
    @Param('invitationId') invitationId: string,
    @Body()
    {
      file,
    }: {
      file: MemoryStoredFile;
    },
  ) {
    return this.invitationService.uploadMusic(invitationId, req.user.id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/og-image/:uniqueId')
  @FormDataRequest({ storage: MemoryStoredFile })
  uploadOgImage(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body()
    {
      file,
    }: {
      file: MemoryStoredFile;
    },
  ) {
    return this.invitationService.uploadOgImage(uniqueId, req.user.id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/og-image/:uniqueId')
  deleteOgImage(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.invitationService.deleteOgImage(uniqueId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/music/:invitationId')
  updateMusic(
    @Req() req,
    @Param('invitationId') invitationId: string,
    @Body()
    {
      key,
    }: {
      key: string;
    },
  ) {
    return this.invitationService.updateMusic(invitationId, req.user.id, key);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/color/:uniqueId')
  updateColor(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body()
    { color, type }: { color: string; type: string },
  ) {
    return this.invitationService.updateColor(
      uniqueId,
      req.user.id,
      type,
      color,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/cover-photo/:uniqueId')
  @FormDataRequest({ storage: MemoryStoredFile })
  updateMainPhoto(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Query('type') type: string,
    @Body() body: UpdateMainPhotoDto,
  ) {
    return this.invitationService.updatePhoto(
      uniqueId,
      req.user.id,
      body,
      type,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/cover-photo/:uniqueId')
  deleteCoverPhoto(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Query('type') type: string,
  ) {
    return this.invitationService.deleteCoverPhoto(uniqueId, type, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/templateNo/:uniqueId')
  updateTemplateNo(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { templateNo: number },
  ) {
    return this.invitationService.updateTemplateNo(
      uniqueId,
      req.user.id,
      body.templateNo,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/custom-main-photo/:uniqueId')
  updateCustomMainPhoto(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { useCustomMainPhoto: boolean },
  ) {
    return this.invitationService.updateCustomMainPhoto(
      uniqueId,
      req.user.id,
      body.useCustomMainPhoto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/rsvp/:uniqueId')
  getRSVP(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.invitationService.getRSVPlist(uniqueId, req.user.id);
  }

  @Post('rsvp/:uniqueId')
  postRSVP(@Param('uniqueId') uniqueId: string, @Body() body: RsvpDto) {
    return this.invitationService.postRSVP(uniqueId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('rsvp/:uniqueId/:rsvpId')
  deleteRSVP(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('rsvpId') rsvpId: string,
  ) {
    return this.invitationService.deleteRSVP(
      uniqueId,
      Number(rsvpId),
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('rsvp/:uniqueId/:rsvpId')
  updateRSVP(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('rsvpId') rsvpId: string,
    @Body() body: UpdateRsvpDto,
  ) {
    return this.invitationService.updateRSVP(
      uniqueId,
      Number(rsvpId),
      req.user.id,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/dressCode/:uniqueId')
  updateDressCode(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { dressCodeGentleman: string; dressCodeLady: string },
  ) {
    return this.invitationService.updateDressCode(
      uniqueId,
      req.user.id,
      body.dressCodeGentleman,
      body.dressCodeLady,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/dressCodeColor/:uniqueId')
  updateDressCodeColor(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { mainColor: string; subColor: string; thirdColor: string },
  ) {
    return this.invitationService.updateDressCodeColor(
      uniqueId,
      req.user.id,
      body.mainColor,
      body.subColor,
      body.thirdColor,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/sponsor/:uniqueId')
  updateSponsor(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body()
    body: {
      primarySponsor: string;
      secondarySponsor?: string;
      sponsorColumns?: number;
      secondarySponsorColumns?: number;
      primarySponsorRight?: string | null;
      secondarySponsorRight?: string | null;
    },
  ) {
    return this.invitationService.updateSponsor(
      uniqueId,
      req.user.id,
      body.primarySponsor,
      body.secondarySponsor,
      body.sponsorColumns,
      body.secondarySponsorColumns,
      body.primarySponsorRight,
      body.secondarySponsorRight,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/entourage/:uniqueId')
  updateEntourage(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateEntourageDto,
  ) {
    return this.invitationService.updateEntourage(uniqueId, req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/sponsorList/:uniqueId')
  updateSponsorList(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateSponsorListDto,
  ) {
    return this.invitationService.updateSponsorList(uniqueId, req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/layoutOrder/:uniqueId')
  layoutOrderUpdate(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { layoutOrder: string },
  ) {
    return this.invitationService.layoutOrderUpdate(
      uniqueId,
      req.user.id,
      body.layoutOrder,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/notice/:uniqueId')
  updateNotice(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { notice: string },
  ) {
    return this.invitationService.updateNotice(
      uniqueId,
      req.user.id,
      body.notice,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/opening/:uniqueId')
  updateOpening(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body()
    body: {
      openingEnabled?: boolean;
      openingText1?: string | null;
      openingText2?: string | null;
      openingText3?: string | null;
      openingStyle?: { textColor?: string; fontScale?: string } | null;
    },
  ) {
    return this.invitationService.updateOpening(uniqueId, req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/meta/:uniqueId')
  updateMeta(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateInvitationMetaDto,
  ) {
    return this.invitationService.updateMeta(
      uniqueId,
      req.user.id,
      body.title,
      body.description,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/rsvpTitle/:uniqueId')
  updateRsvpTitle(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { rsvpTitle: string },
  ) {
    return this.invitationService.updateRsvpTitle(
      uniqueId,
      req.user.id,
      body.rsvpTitle,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/rsvpMaxPax/:uniqueId')
  updateRsvpMaxPax(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { rsvpMaxPax: number },
  ) {
    return this.invitationService.updateRsvpMaxPax(
      uniqueId,
      req.user.id,
      body.rsvpMaxPax,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/rsvpDeadline/:uniqueId')
  updateRsvpDeadline(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { rsvpDeadline: string | null },
  ) {
    return this.invitationService.updateRsvpDeadline(
      uniqueId,
      req.user.id,
      body.rsvpDeadline,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/rsvpDeadlineEnabled/:uniqueId')
  updateRsvpDeadlineEnabled(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { hasRsvpDeadline: boolean },
  ) {
    return this.invitationService.updateHasRsvpDeadline(
      uniqueId,
      req.user.id,
      body.hasRsvpDeadline,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/rsvpDeadlineDesc/:uniqueId')
  updateRsvpDeadlineDesc(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { rsvpDeadlineDesc: string },
  ) {
    return this.invitationService.updateRsvpDeadlineDesc(
      uniqueId,
      req.user.id,
      body.rsvpDeadlineDesc,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/rsvpHasFood/:uniqueId')
  updateRsvpHasFood(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { rsvpHasFood: boolean },
  ) {
    return this.invitationService.updateRsvpHasFood(
      uniqueId,
      req.user.id,
      body.rsvpHasFood,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/rsvpPopup/:uniqueId')
  updateRsvpPopup(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { isRsvpPopup: boolean },
  ) {
    return this.invitationService.updateRsvpPopup(
      uniqueId,
      req.user.id,
      body.isRsvpPopup,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/endingText/:uniqueId')
  updateEndingText(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { endingText: string },
  ) {
    return this.invitationService.updateEndingText(
      uniqueId,
      req.user.id,
      body.endingText,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/monetaryGift/:uniqueId')
  updateMonetaryGift(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body()
    body: {
      bankAccount: string;
      wishlistText: string;
      wishlistUrl: string;
    },
  ) {
    return this.invitationService.updateMonetaryGift(
      uniqueId,
      req.user.id,
      body.bankAccount,
      body.wishlistText,
      body.wishlistUrl,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/font/:uniqueId')
  updateFont(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: { font: string },
  ) {
    return this.invitationService.updateFont(uniqueId, req.user.id, body.font);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/onboarding/status/:uniqueId')
  getOnboardingStatus(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.invitationService.getOnboardingStatus(uniqueId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/onboarding/data/:uniqueId')
  getOnboardingData(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.invitationService.getOnboardingData(uniqueId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/onboarding/complete/:uniqueId')
  completeOnboarding(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.invitationService.completeOnboarding(uniqueId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/onboarding/step/:uniqueId')
  updateOnboardingStep(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body()
    body: {
      groomFirstName?: string;
      groomLastName?: string;
      brideFirstName?: string;
      brideLastName?: string;
      date?: string | null;
      templateNo?: number;
    },
  ) {
    return this.invitationService.updateOnboardingStep(
      uniqueId,
      req.user.id,
      body,
    );
  }
}
