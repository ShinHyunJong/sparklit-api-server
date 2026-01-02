import { Injectable } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import cryptoRandomString from 'crypto-random-string';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateInvitationDto,
  UpdateMainPhotoDto,
} from './dto/update-invitation.dto';
import dayjs from 'dayjs';
import { deleteFromS3, upload2S3 } from 'src/helpers/s3.helper';
import { RsvpDto } from './dto/rsvp.dto';
import { postRSVPmail } from 'src/utils/mailjet.util';
import { MemoryStoredFile } from 'nestjs-form-data';
import { makeOgImage } from 'src/helpers/image.helper';

@Injectable()
export class InvitationService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(userId: number) {
    const uniqueId = cryptoRandomString({ length: 16 });
    const created = await this.prismaService.invitation.create({
      data: {
        userId,
        uniqueId,
      },
    });
    return created;
  }

  async findAll(userId: number) {
    const invitationList = await this.prismaService.invitation.findMany({
      where: { userId },
    });
    return invitationList;
  }

  async findOne(uniqueId: string) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      include: {
        placeList: {
          include: {
            place: true,
            timeList: true,
          },
        },
        invitationCoverPhotoList: true,
        photoList: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    return invitation;
  }

  async updateDressCodeColor(
    uniqueId: string,
    mainColor: string,
    subColor: string,
    thirdColor: string,
  ) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        dressCodeMainColor: mainColor,
        dressCodeSubColor: subColor,
        dressCodeThirdColor: thirdColor,
      },
    });
    return updated;
  }

  async updateDressCode(
    uniqueId: string,
    dressCodeGentleman: string,
    dressCodeLady: string,
  ) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        dressCodeGentleman,
        dressCodeLady,
      },
    });
    return updated;
  }

  async updateInvitation(
    uniqueId: string,
    updateInvitationDto: UpdateInvitationDto,
  ) {
    const prevInvitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
    });
    const prevDate = dayjs(prevInvitation.date);

    const targetDate = dayjs(updateInvitationDto.date);
    const targetYear = targetDate.get('year');
    const targetMonth = targetDate.get('month');
    const targetDay = targetDate.get('date');

    const newDate = prevDate
      .set('year', targetYear)
      .set('month', targetMonth)
      .set('date', targetDay);

    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        ...updateInvitationDto,
        date: newDate.toDate(),
      },
    });
    return updated;
  }

  async updatePhoto(
    uniqueId: string,
    body: UpdateMainPhotoDto,
    type: string, // 인자로 구분
  ) {
    const originalFile = body.originalFile;
    const croppedFile = body.croppedFile;
    const photoJSON = JSON.parse(body.photoJSON);
    const { crop, zoom, width, height } = photoJSON;

    // 파일 이름 랜덤 생성
    const originalName = cryptoRandomString({ length: 16 });
    const originalExtension = originalFile.mimeType.split('/')[1];
    const croppedName = cryptoRandomString({ length: 16 });
    const croppedExtension = croppedFile.mimeType.split('/')[1];

    // S3 경로 구성 (type에 따라 상위 폴더가 cover 또는 end로 분기)
    const folder = type === 'main' ? 'cover' : 'end';

    const originalKey = `invitations/${uniqueId}/${folder}/original/${originalName}.${originalExtension}`;
    const croppedKey = `invitations/${uniqueId}/${folder}/cropped/${croppedName}.${croppedExtension}`;

    // S3 업로드
    await upload2S3(originalKey, originalFile.buffer);
    await upload2S3(croppedKey, croppedFile.buffer);

    if (type === 'main') {
      const ogImageBuffer = await makeOgImage(croppedFile.buffer);
      const ogImageName = cryptoRandomString({ length: 16 });
      const ogImageKey = `invitations/${uniqueId}/og/${ogImageName}.jpg`;
      await upload2S3(ogImageKey, ogImageBuffer);
      await this.prismaService.invitation.update({
        where: { uniqueId },
        data: {
          ogImageKey,
        },
      });
    }

    // 해당 타입의 기존 데이터가 있는지 확인
    const invitationCover =
      await this.prismaService.invitationCoverPhoto.findFirst({
        where: { type, invitation: { uniqueId } },
      });

    const photoData = {
      originalKey,
      croppedKey,
      cropX: crop.x,
      cropY: crop.y,
      cropZoom: zoom,
      width: width,
      height: height,
    };

    if (!invitationCover) {
      // 신규 생성
      return await this.prismaService.invitationCoverPhoto.create({
        data: {
          invitation: { connect: { uniqueId } },
          type,
          ...photoData,
        },
      });
    } else {
      // 기존 데이터 업데이트
      const updated = await this.prismaService.invitationCoverPhoto.update({
        where: { id: invitationCover.id },
        data: photoData,
      });

      // 기존 크롭 이미지는 S3에서 삭제하여 용량 관리
      await deleteFromS3(invitationCover.croppedKey);
      return updated;
    }
  }

  async updateGreeting(uniqueId: string, title: string, content: string) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        greetingTitle: title,
        greetingContent: content,
      },
    });
    return updated;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }

  async updateTemplateNo(uniqueId: string, templateNo: number) {
    await this.prismaService.invitation.update({
      where: {
        uniqueId,
      },
      data: {
        templateNo,
      },
    });
  }

  async updateColor(uniqueId: string, type: string, color: string) {
    const colorUpdate = { [type]: color };

    await this.prismaService.invitation.update({
      where: {
        uniqueId,
      },
      data: colorUpdate,
    });
  }

  async updateMusic(uniqueId: string, s3Key: string) {
    await this.prismaService.invitation.update({
      where: {
        uniqueId,
      },
      data: {
        musicKey: s3Key,
      },
    });
  }

  async uploadMusic(uniqueId: string, file: MemoryStoredFile) {
    const prevInvitationMusic = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
    });
    if (
      prevInvitationMusic.musicKey &&
      !prevInvitationMusic.musicKey.startsWith('assets')
    ) {
      await deleteFromS3(prevInvitationMusic.musicKey);
    }
    const musicName = cryptoRandomString({ length: 16 });
    const musicExtension = file.mimeType.split('/')[1];
    const musicKey = `invitations/${uniqueId}/music/${musicName}.${musicExtension}`;
    await upload2S3(musicKey, file.buffer);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        musicKey,
        musicFileKey: musicKey,
        musicFilename: file.originalName,
      },
    });
    return musicKey;
  }

  async updateSponsor(
    uniqueId: string,
    primarySponsor: string,
    secondarySponsor: string,
  ) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        primarySponsor,
        secondarySponsor,
      },
    });
    return updated;
  }

  async updateEntourage(
    uniqueId: string,
    bestMan: string,
    maidOfHonor: string,
    groomsMen: string,
    bridesMaids: string,
  ) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        bestMan,
        maidOfHonor,
        groomsMen,
        bridesMaids,
      },
    });
    return updated;
  }

  async postRSVP(uniqueId: string, body: RsvpDto) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: {
        uniqueId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    await this.prismaService.invitationRSVP.create({
      data: {
        invitationId: invitation.id,
        name: body.name,
        email: body.email,
        side: body.side,
        phone: body.phone,
        attending: body.attending,
      },
    });
    const name = `${invitation.groomFirstName} & ${invitation.brideFirstName}`;
    const result = await postRSVPmail(invitation.user.email, name, {
      attendanceStatus: body.attending ? 'Attending' : 'Not Attending',
      guestName: body.name,
      guestEmail: body.email,
      guestPhone: body.phone,
      submittedAt: dayjs().format('YYYY-MM-DD HH:mm (Z)'),
      rsvpDashboardUrl: `https://admin.sparklit.co/invitations/${uniqueId}/rsvps`,
    });
    return result;
  }

  async getRSVPlist(uniqueId: string) {
    const result = await this.prismaService.invitationRSVP.findMany({
      where: {
        invitation: {
          uniqueId,
        },
      },
    });
    return result;
  }

  async updateNotice(uniqueId: string, notice: string) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        notice,
      },
    });
    return updated;
  }

  async layoutOrderUpdate(uniqueId: string, layoutOrder: string) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        layoutOrder: layoutOrder,
      },
    });
    return updated;
  }

  async updateEndingText(uniqueId: string, endingText: string) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        endingText,
      },
    });
    return updated;
  }
}
