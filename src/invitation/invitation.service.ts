import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import cryptoRandomString from 'crypto-random-string';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateInvitationDto,
  UpdateMainPhotoDto,
} from './dto/update-invitation.dto';
import dayjs from 'dayjs';
import { deleteFromS3, upload2S3 } from 'src/helpers/s3.helper';
import { RsvpDto, UpdateRsvpDto } from './dto/rsvp.dto';
import { postRSVPmail } from 'src/utils/mailjet.util';
import { MemoryStoredFile } from 'nestjs-form-data';
import { getTimezoneByCountry } from 'src/helpers/timezone.helper';
import { formatTimeValue } from 'src/helpers/time.helper';

@Injectable()
export class InvitationService {
  constructor(private readonly prismaService: PrismaService) {}
  private normalizeUniqueId(value: string) {
    return value.trim().toLowerCase();
  }

  private serializeGuestNameList(list?: string[] | null) {
    if (!list) return null;
    const normalized = list.map((name) => name.trim()).filter(Boolean);
    if (normalized.length === 0) return null;
    return JSON.stringify(normalized);
  }

  private parseGuestNameList(value?: string | null) {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((name) => String(name).trim()).filter(Boolean);
    } catch {
      return value
        .split(/[\n,]+/)
        .map((name) => name.trim())
        .filter(Boolean);
    }
  }

  private withGuestNameList<T extends { guestNameList?: string | null }>(
    rsvp: T | null,
  ) {
    if (!rsvp) return rsvp;
    return {
      ...rsvp,
      guestNameList: this.parseGuestNameList(rsvp.guestNameList),
    };
  }

  async checkUniqueIdAvailability(value: string, currentUniqueId?: string) {
    const normalized = this.normalizeUniqueId(value);
    const normalizedCurrent = currentUniqueId
      ? this.normalizeUniqueId(currentUniqueId)
      : undefined;
    if (normalizedCurrent && normalized === normalizedCurrent) {
      return { available: true, uniqueId: normalized };
    }

    const existing = await this.prismaService.invitation.findUnique({
      where: { uniqueId: normalized },
      select: { id: true },
    });
    return { available: !existing, uniqueId: normalized };
  }

  async updateUniqueId(
    uniqueId: string,
    newUniqueId: string,
    userId: number,
  ) {
    const normalized = this.normalizeUniqueId(newUniqueId);
    if (normalized === this.normalizeUniqueId(uniqueId)) {
      return { uniqueId: normalized };
    }

    const invitation = await this.prismaService.invitation.findFirst({
      where: { uniqueId, userId },
      select: { id: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    const existing = await this.prismaService.invitation.findUnique({
      where: { uniqueId: normalized },
      select: { id: true },
    });
    if (existing) {
      throw new BadRequestException('UniqueId already exists');
    }

    await this.prismaService.invitation.update({
      where: { id: invitation.id },
      data: { uniqueId: normalized },
    });

    return { uniqueId: normalized };
  }
  async create(userId: number) {
    const uniqueId = cryptoRandomString({ length: 16 });
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { country: true },
    });
    const timezone = getTimezoneByCountry(user?.country);
    const weddingDate = dayjs().add(3, 'month').toDate();
    const rsvpDeadline = dayjs(weddingDate).subtract(1, 'day').toDate();
    const created = await this.prismaService.invitation.create({
      data: {
        userId,
        uniqueId,
        timezone,
        date: weddingDate,
        rsvpDeadline,
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
        user: {
          select: {
            country: true,
          },
        },
        placeList: {
          include: {
            place: true,
            timeList: true,
          },
        },
        invitationCoverPhotoList: true,
        InvitationDressColor: {
          orderBy: [{ type: 'asc' }, { order: 'asc' }, { id: 'asc' }],
        },
        faqList: {
          orderBy: [{ order: 'asc' }, { id: 'asc' }],
        },
        photoList: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    if (!invitation) return null;
    const timezone =
      invitation.timezone ?? getTimezoneByCountry(invitation.user?.country);

    if (!invitation.timezone && timezone !== 'UTC') {
      await this.prismaService.invitation.update({
        where: { uniqueId },
        data: { timezone },
      });
    }

    const { user, InvitationDressColor, ...rest } = invitation;
    const placeList = rest.placeList?.map((place) => ({
      ...place,
      timeList: place.timeList?.map((timeItem) => ({
        ...timeItem,
        time: formatTimeValue(timeItem.time),
      })),
    }));
    return {
      ...rest,
      placeList,
      dressCodeColorList: InvitationDressColor ?? [],
      timezone,
    };
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
    const targetDate = dayjs(updateInvitationDto.date);

    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        ...updateInvitationDto,
        date: targetDate.toDate(),
      },
    });
    return updated;
  }

  async updatePhoto(
    uniqueId: string,
    body: UpdateMainPhotoDto,
    type: string, // 인자로 구분
  ) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      select: { id: true, ogImageKey: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

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

    // 해당 타입의 기존 데이터가 있는지 확인
    const invitationCover =
      await this.prismaService.invitationCoverPhoto.findFirst({
        where: { type, invitation: { uniqueId } },
      });
    const shouldSyncOgWithMain =
      type === 'main' &&
      (!invitation.ogImageKey ||
        invitationCover?.croppedKey === invitation.ogImageKey);

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
      const created = await this.prismaService.invitationCoverPhoto.create({
        data: {
          invitation: { connect: { uniqueId } },
          type,
          ...photoData,
        },
      });
      if (shouldSyncOgWithMain) {
        await this.prismaService.invitation.update({
          where: { id: invitation.id },
          data: { ogImageKey: created.croppedKey },
        });
      }
      return created;
    } else {
      // 기존 데이터 업데이트
      const updated = await this.prismaService.invitationCoverPhoto.update({
        where: { id: invitationCover.id },
        data: photoData,
      });

      // 기존 크롭 이미지는 S3에서 삭제하여 용량 관리
      await deleteFromS3(invitationCover.croppedKey);
      if (shouldSyncOgWithMain) {
        await this.prismaService.invitation.update({
          where: { id: invitation.id },
          data: { ogImageKey: updated.croppedKey },
        });
      }
      return updated;
    }
  }

  async deleteCoverPhoto(uniqueId: string, type: string, userId: number) {
    const allowedTypes = new Set([
      'main',
      'end',
      'dressCodeGentleman',
      'dressCodeLady',
    ]);
    if (!allowedTypes.has(type)) {
      throw new BadRequestException('Invalid cover photo type');
    }

    const invitation = await this.prismaService.invitation.findFirst({
      where: { uniqueId, userId },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    const coverPhoto = await this.prismaService.invitationCoverPhoto.findFirst({
      where: { type, invitationId: invitation.id },
    });

    if (!coverPhoto) {
      return { deleted: 0 };
    }

    if (coverPhoto.originalKey) {
      await deleteFromS3(coverPhoto.originalKey);
    }
    if (coverPhoto.croppedKey) {
      await deleteFromS3(coverPhoto.croppedKey);
    }
    if (type === 'main' && invitation.ogImageKey === coverPhoto.croppedKey) {
      await this.prismaService.invitation.update({
        where: { id: invitation.id },
        data: { ogImageKey: null },
      });
    }

    await this.prismaService.invitationCoverPhoto.delete({
      where: { id: coverPhoto.id },
    });

    return { deleted: 1 };
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

  async uploadOgImage(uniqueId: string, file: MemoryStoredFile) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      select: { id: true, ogImageKey: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    const ogImageName = cryptoRandomString({ length: 16 });
    const ogImageKey = `invitations/${uniqueId}/og/custom/${ogImageName}.jpg`;
    await upload2S3(ogImageKey, file.buffer);

    if (invitation.ogImageKey && invitation.ogImageKey !== ogImageKey) {
      await deleteFromS3(invitation.ogImageKey);
    }

    await this.prismaService.invitation.update({
      where: { id: invitation.id },
      data: { ogImageKey },
    });

    return { ogImageKey };
  }

  async deleteOgImage(uniqueId: string, userId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: { uniqueId, userId },
      select: { id: true, ogImageKey: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    if (!invitation.ogImageKey) {
      return { deleted: 0 };
    }

    await deleteFromS3(invitation.ogImageKey);
    await this.prismaService.invitation.update({
      where: { id: invitation.id },
      data: { ogImageKey: null },
    });
    return { deleted: 1 };
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
        pax: body.pax ?? null,
        remark: body.remark ?? null,
        food: body.food ?? null,
        guestNameList: this.serializeGuestNameList(body.guestNameList),
      },
    });
    const name = `${invitation.groomFirstName} & ${invitation.brideFirstName}`;
    const result = await postRSVPmail(invitation.user.email, name, {
      attendanceStatus: body.attending ? 'Attending' : 'Not Attending',
      guestName: body.name,
      guestEmail: body.email,
      guestPhone: body.phone,
      submittedAt: dayjs().format('YYYY-MM-DD HH:mm (Z)'),
      rsvpDashboardUrl: `https://sparklit.co/rsvp?uid=${uniqueId}`,
    });
    return result;
  }

  async getRSVPlist(uniqueId: string, userId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: {
        uniqueId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    const result = await this.prismaService.invitationRSVP.findMany({
      where: {
        invitationId: invitation.id,
      },
    });
    return result.map((item) => this.withGuestNameList(item));
  }

  async deleteRSVP(uniqueId: string, rsvpId: number, userId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: {
        uniqueId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    const result = await this.prismaService.invitationRSVP.deleteMany({
      where: {
        id: rsvpId,
        invitationId: invitation.id,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('RSVP not found.');
    }

    return { deleted: result.count };
  }

  async updateRSVP(
    uniqueId: string,
    rsvpId: number,
    userId: number,
    body: UpdateRsvpDto,
  ) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: {
        uniqueId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    const updateData = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      attending:
        typeof body.attending === 'boolean' ? body.attending : undefined,
      pax:
        body.pax === null || typeof body.pax === 'number'
          ? body.pax
          : undefined,
      remark: body.remark,
      food: body.food,
      guestNameList:
        body.guestNameList === undefined
          ? undefined
          : body.guestNameList === null
            ? null
            : this.serializeGuestNameList(body.guestNameList),
    };

    const hasUpdates = Object.values(updateData).some(
      (value) => value !== undefined,
    );

    if (!hasUpdates) {
      const existing = await this.prismaService.invitationRSVP.findUnique({
        where: {
          id: rsvpId,
        },
      });
      return this.withGuestNameList(existing);
    }

    const result = await this.prismaService.invitationRSVP.updateMany({
      where: {
        id: rsvpId,
        invitationId: invitation.id,
      },
      data: updateData,
    });

    if (result.count === 0) {
      throw new NotFoundException('RSVP not found.');
    }

    const updated = await this.prismaService.invitationRSVP.findUnique({
      where: {
        id: rsvpId,
      },
    });
    return this.withGuestNameList(updated);
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

  async updateMeta(
    uniqueId: string,
    title?: string,
    description?: string,
  ) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
      },
    });
    return updated;
  }

  async updateRsvpTitle(uniqueId: string, rsvpTitle: string) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpTitle,
      },
    });
    return updated;
  }

  async updateRsvpMaxPax(uniqueId: string, rsvpMaxPax: number) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpMaxPax,
      },
    });
    return updated;
  }

  async updateRsvpDeadline(uniqueId: string, rsvpDeadline: string | null) {
    if (rsvpDeadline) {
      const nextDate = new Date(rsvpDeadline);
      if (Number.isNaN(nextDate.getTime())) {
        throw new BadRequestException('Invalid rsvpDeadline value.');
      }
    }
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpDeadline: rsvpDeadline ? new Date(rsvpDeadline) : null,
      },
    });
    return updated;
  }

  async deleteInvitation(uniqueId: string, userId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: { uniqueId, userId },
      include: {
        photoList: true,
        invitationCoverPhotoList: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    const rawKeys = [
      invitation.ogImageKey,
      invitation.musicKey,
      invitation.musicFileKey,
      ...invitation.photoList.flatMap((photo) => [
        photo.originalKey,
        photo.croppedKey,
        photo.thumbKey,
      ]),
      ...invitation.invitationCoverPhotoList.flatMap((photo) => [
        photo.originalKey,
        photo.croppedKey,
      ]),
    ];

    const keysToDelete = rawKeys.filter(
      (key): key is string => Boolean(key && !key.startsWith('assets/')),
    );

    await Promise.all(keysToDelete.map((key) => deleteFromS3(key)));
    await this.prismaService.invitation.delete({ where: { id: invitation.id } });
    return { deleted: 1 };
  }

  async updateRsvpDeadlineDesc(uniqueId: string, rsvpDeadlineDesc: string) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpDeadlineDesc,
      },
    });
    return updated;
  }

  async updateRsvpHasFood(uniqueId: string, rsvpHasFood: boolean) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpHasFood,
      },
    });
    return updated;
  }

  async updateRsvpPopup(uniqueId: string, isRsvpPopup: boolean) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        isRsvpPopup,
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

  async updateMonetaryGift(
    uniqueId: string,
    bankAccount: string,
    wishlistText: string,
    wishlistUrl: string,
  ) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        bankAccount,
        wishlistText,
        wishlistUrl,
      },
    });
    return updated;
  }

  async updateFont(uniqueId: string, font: string) {
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        baseFont: font,
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
