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
import { RsvpDto } from './dto/rsvp.dto';

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

  @Get(':uniqueId')
  findOne(@Param('uniqueId') uniqueId: string) {
    return this.invitationService.findOne(uniqueId);
  }

  @Put(':uniqueId')
  update(
    @Param('uniqueId') uniqueId: string,
    @Body() updateInvitationDto: UpdateInvitationDto,
  ) {
    return this.invitationService.updateInvitation(
      uniqueId,
      updateInvitationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/greeting/:uniqueId')
  updateGreeting(
    @Param('uniqueId') uniqueId: string,
    @Body()
    { title, content }: { title: string; content: string },
  ) {
    return this.invitationService.updateGreeting(uniqueId, title, content);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/music/upload/:invitationId')
  @FormDataRequest({ storage: MemoryStoredFile })
  uploadMusic(
    @Param('invitationId') invitationId: string,
    @Body()
    {
      file,
    }: {
      file: MemoryStoredFile;
    },
  ) {
    return this.invitationService.uploadMusic(invitationId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/music/:invitationId')
  updateMusic(
    @Param('invitationId') invitationId: string,
    @Body()
    {
      key,
    }: {
      key: string;
    },
  ) {
    return this.invitationService.updateMusic(invitationId, key);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/color/:uniqueId')
  updateColor(
    @Param('uniqueId') uniqueId: string,
    @Body()
    { color, type }: { color: string; type: string },
  ) {
    return this.invitationService.updateColor(uniqueId, type, color);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/cover-photo/:uniqueId')
  @FormDataRequest({ storage: MemoryStoredFile })
  updateMainPhoto(
    @Param('uniqueId') uniqueId: string,
    @Query('type') type: string,
    @Body() body: UpdateMainPhotoDto,
  ) {
    return this.invitationService.updatePhoto(uniqueId, body, type);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/templateNo/:uniqueId')
  updateTemplateNo(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { templateNo: number },
  ) {
    return this.invitationService.updateTemplateNo(uniqueId, body.templateNo);
  }

  @Get('/rsvp/:uniqueId')
  getRSVP(@Param('uniqueId') uniqueId: string) {
    return this.invitationService.getRSVPlist(uniqueId);
  }

  @Post('rsvp/:uniqueId')
  postRSVP(@Param('uniqueId') uniqueId: string, @Body() body: RsvpDto) {
    return this.invitationService.postRSVP(uniqueId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/dressCode/:uniqueId')
  updateDressCode(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { dressCodeGentleman: string; dressCodeLady: string },
  ) {
    return this.invitationService.updateDressCode(
      uniqueId,
      body.dressCodeGentleman,
      body.dressCodeLady,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/dressCodeColor/:uniqueId')
  updateDressCodeColor(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { mainColor: string; subColor: string; thirdColor: string },
  ) {
    return this.invitationService.updateDressCodeColor(
      uniqueId,
      body.mainColor,
      body.subColor,
      body.thirdColor,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/sponsor/:uniqueId')
  updateSponsor(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { primarySponsor: string; secondarySponsor: string },
  ) {
    return this.invitationService.updateSponsor(
      uniqueId,
      body.primarySponsor,
      body.secondarySponsor,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/entourage/:uniqueId')
  updateEntourage(
    @Param('uniqueId') uniqueId: string,
    @Body()
    body: {
      bestMan: string;
      maidOfHonor: string;
      groomsMen: string;
      bridesMaids: string;
    },
  ) {
    return this.invitationService.updateEntourage(
      uniqueId,
      body.bestMan,
      body.maidOfHonor,
      body.groomsMen,
      body.bridesMaids,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/layoutOrder/:uniqueId')
  layoutOrderUpdate(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { layoutOrder: string },
  ) {
    return this.invitationService.layoutOrderUpdate(uniqueId, body.layoutOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/notice/:uniqueId')
  updateNotice(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { notice: string },
  ) {
    return this.invitationService.updateNotice(uniqueId, body.notice);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/endingText/:uniqueId')
  updateEndingText(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { endingText: string },
  ) {
    return this.invitationService.updateEndingText(uniqueId, body.endingText);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/monetaryGift/:uniqueId')
  updateMonetaryGift(
    @Param('uniqueId') uniqueId: string,
    @Body()
    body: {
      bankAccount: string;
      wishlistUrl: string;
    },
  ) {
    return this.invitationService.updateMonetaryGift(
      uniqueId,
      body.bankAccount,
      body.wishlistUrl,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/font/:uniqueId')
  updateFont(
    @Param('uniqueId') uniqueId: string,
    @Body() body: { font: string },
  ) {
    return this.invitationService.updateFont(uniqueId, body.font);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationService.remove(+id);
  }
}
