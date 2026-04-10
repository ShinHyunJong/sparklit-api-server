import {
  BadRequestException,
  ForbiddenException,
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
import { assertAudioMime, assertImageMime } from 'src/helpers/mime.helper';
import { getEffectivePlanFeatures, PLAN_FEATURES } from 'src/constants/planFeatures';

@Injectable()
export class InvitationService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly reservedUniqueIds = [
    'studio',
    'auth',
    'my',
    'api',
    'rsvp',
    'invitation',
    'admin',
    '_next',
    'assets',
  ];
  private normalizeUniqueId(value: string) {
    return value.trim().toLowerCase();
  }
  private isReservedUniqueId(value: string) {
    return this.reservedUniqueIds.includes(this.normalizeUniqueId(value));
  }

  /**
   * Verify that the given user owns the invitation. Throws NotFoundException
   * if invitation does not exist, ForbiddenException if owned by another user.
   * Returns the invitation id for convenience.
   */
  private async assertInvitationOwnership(
    uniqueId: string,
    userId: number,
  ): Promise<number> {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      select: { id: true, userId: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    if (invitation.userId !== userId) {
      throw new ForbiddenException('You do not own this invitation');
    }
    return invitation.id;
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

  private isInvitationEditLocked(invitation: {
    billingStatus: string | null;
    date: Date | null;
    hasRsvpDeadline?: boolean | null;
    groomFirstName?: string | null;
    brideFirstName?: string | null;
    groomDadName?: string | null;
    groomMomName?: string | null;
    brideDadName?: string | null;
    brideMomName?: string | null;
    placeList?: Array<{ timeList?: Array<{ time?: unknown }> }>;
    photoList?: Array<unknown>;
    _count?: { invitationRSVP?: number };
  }) {
    if (invitation.billingStatus !== 'PAID' || !invitation.date) return false;

    // 1. 결혼일 +1일 경과
    const today = dayjs().startOf('day');
    const lockDate = dayjs(invitation.date).startOf('day').add(1, 'day');
    if (today.isBefore(lockDate)) return false;

    // 2. 사진 1개 이상
    if ((invitation.photoList?.length ?? 0) < 1) return false;

    // 3. 장소 1개 이상
    if ((invitation.placeList?.length ?? 0) < 1) return false;

    // 4. 시간 1개 이상
    const hasTime =
      invitation.placeList?.some((p) =>
        p.timeList?.some((t) => t.time != null),
      ) ?? false;
    if (!hasTime) return false;

    // 5. 신랑/신부 이름
    if (!invitation.groomFirstName?.trim() || !invitation.brideFirstName?.trim())
      return false;

    // 6. 부모님 이름 1명 이상
    const hasParentName = [
      invitation.groomDadName,
      invitation.groomMomName,
      invitation.brideDadName,
      invitation.brideMomName,
    ].some((n) => n?.trim());
    if (!hasParentName) return false;

    return true;
  }

  private async assertNotLocked(uniqueId: string) {
    const inv = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      include: {
        placeList: { include: { timeList: true } },
        photoList: true,
        _count: { select: { invitationRSVP: true } },
        user: { select: { isAdmin: true } },
      },
    });
    if (!inv || inv.user?.isAdmin) return;
    if (this.isInvitationEditLocked(inv)) {
      throw new BadRequestException(
        'This invitation is locked and can no longer be edited.',
      );
    }
  }

  async checkUniqueIdAvailability(value: string, currentUniqueId?: string) {
    const normalized = this.normalizeUniqueId(value);
    const normalizedCurrent = currentUniqueId
      ? this.normalizeUniqueId(currentUniqueId)
      : undefined;
    if (normalizedCurrent && normalized === normalizedCurrent) {
      return { available: true, uniqueId: normalized };
    }
    if (this.isReservedUniqueId(normalized)) {
      return { available: false, uniqueId: normalized };
    }

    const existing = await this.prismaService.invitation.findUnique({
      where: { uniqueId: normalized },
      select: { id: true },
    });
    return { available: !existing, uniqueId: normalized };
  }

  async updateUniqueId(uniqueId: string, newUniqueId: string, userId: number) {
    await this.assertNotLocked(uniqueId);
    const normalized = this.normalizeUniqueId(newUniqueId);
    if (normalized === this.normalizeUniqueId(uniqueId)) {
      return { uniqueId: normalized };
    }
    if (this.isReservedUniqueId(normalized)) {
      throw new BadRequestException('UniqueId reserved');
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
    const rsvpDeadline = dayjs(weddingDate).startOf('day').toDate();
    const created = await this.prismaService.invitation.create({
      data: {
        userId,
        uniqueId,
        timezone,
        date: weddingDate,
        rsvpDeadline,
        hasRsvpDeadline: true,
      },
    });
    return created;
  }

  async findAll(userId: number) {
    const invitationList = await this.prismaService.invitation.findMany({
      where: { userId },
      include: {
        placeList: { include: { timeList: { select: { id: true, time: true } } } },
        photoList: { select: { id: true } },
        _count: { select: { invitationRSVP: true } },
        user: { select: { isAdmin: true } },
      },
    });
    return invitationList.map((inv) => {
      const { placeList, photoList, _count, user, ...rest } = inv;
      return {
        ...rest,
        isEditLocked: user?.isAdmin ? false : this.isInvitationEditLocked(inv),
      };
    });
  }

  async getSamplePreviews(uniqueIds: string[]) {
    if (uniqueIds.length === 0) return [];
    const invitations = await this.prismaService.invitation.findMany({
      where: { uniqueId: { in: uniqueIds } },
      select: {
        uniqueId: true,
        groomFirstName: true,
        brideFirstName: true,
        invitationCoverPhotoList: {
          where: { type: 'main' },
          take: 1,
          select: { croppedKey: true },
        },
      },
    });
    return invitations.map((inv) => ({
      uniqueId: inv.uniqueId,
      coupleName: [inv.groomFirstName, inv.brideFirstName].filter(Boolean).join(' & '),
      mainImageKey: inv.invitationCoverPhotoList[0]?.croppedKey ?? null,
    }));
  }

  async findOne(uniqueId: string) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      include: {
        user: {
          select: {
            country: true,
            isAdmin: true,
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
        invitationEntourageList: {
          orderBy: [{ order: 'asc' }, { id: 'asc' }],
        },
        photoList: {
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            invitationRSVP: true,
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
    const planFeatures = getEffectivePlanFeatures(
      rest.billingStatus,
      rest.currentPlanCode,
    );
    return {
      ...rest,
      placeList,
      dressCodeColorList: InvitationDressColor ?? [],
      rsvpResponseCount: invitation._count?.invitationRSVP ?? 0,
      timezone,
      planFeatures,
      isEditLocked: user?.isAdmin ? false : this.isInvitationEditLocked(invitation),
    };
  }

  async updateDressCodeColor(
    uniqueId: string,
    userId: number,
    mainColor: string,
    subColor: string,
    thirdColor: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
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
    userId: number,
    dressCodeGentleman: string,
    dressCodeLady: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
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
    userId: number,
    updateInvitationDto: UpdateInvitationDto,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      select: {
        billingStatus: true,
        currentPlanCode: true,
        date: true,
        placeList: {
          select: {
            id: true,
          },
        },
        photoList: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            invitationRSVP: true,
          },
        },
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

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
    userId: number,
    body: UpdateMainPhotoDto,
    type: string, // 인자로 구분
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      select: { id: true, ogImageKey: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    const originalFile = body.originalFile;
    const croppedFile = body.croppedFile;
    assertImageMime(originalFile.mimeType);
    assertImageMime(croppedFile.mimeType);
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
    await this.assertNotLocked(uniqueId);
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

  async updateGreeting(
    uniqueId: string,
    userId: number,
    title: string,
    content: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
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

  async updateTemplateNo(uniqueId: string, userId: number, templateNo: number) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    await this.prismaService.invitation.update({
      where: {
        uniqueId,
      },
      data: {
        templateNo,
      },
    });
  }

  async updateColor(
    uniqueId: string,
    userId: number,
    type: string,
    color: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const colorUpdate = { [type]: color };

    await this.prismaService.invitation.update({
      where: {
        uniqueId,
      },
      data: colorUpdate,
    });
  }

  async updateMusic(uniqueId: string, userId: number, s3Key: string) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    await this.prismaService.invitation.update({
      where: {
        uniqueId,
      },
      data: {
        musicKey: s3Key,
      },
    });
  }

  async uploadOgImage(
    uniqueId: string,
    userId: number,
    file: MemoryStoredFile,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    assertImageMime(file.mimeType);
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
    await this.assertNotLocked(uniqueId);
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

  async uploadMusic(
    uniqueId: string,
    userId: number,
    file: MemoryStoredFile,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    assertAudioMime(file.mimeType);
    const prevInvitationMusic = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
    });
    const planFeatures = getEffectivePlanFeatures(
      prevInvitationMusic?.billingStatus,
      prevInvitationMusic?.currentPlanCode,
    );
    if (!planFeatures.allowCustomMusic) {
      throw new BadRequestException(
        'Custom music upload is a Premium feature. Upgrade to access custom music.',
      );
    }
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
    userId: number,
    primarySponsor: string,
    secondarySponsor: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
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
    userId: number,
    body: {
      bestMan: string;
      maidOfHonor: string;
      groomsMen: string;
      bridesMaids: string;
      bestManLabel?: string | null;
      maidOfHonorLabel?: string | null;
      groomsMenLabel?: string | null;
      bridesMaidsLabel?: string | null;
      invitationEntourageList?: Array<{
        label: string;
        name: string;
        order?: number;
      }>;
    },
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId },
      select: { id: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    const sanitizedInvitationEntourageList = (body.invitationEntourageList ?? [])
      .map((item, index) => ({
        label: item.label.trim(),
        name: item.name.trim(),
        order: item.order ?? index,
      }))
      .filter((item) => item.label || item.name)
      .map((item, index) => ({
        ...item,
        order: index,
      }));

    // NOTE: distinguish null (never set, use default) from empty string
    // (explicitly cleared by user, render as blank).
    const normalizeLabel = (value: string | null | undefined) => {
      if (value === undefined) return undefined;
      if (value === null) return null;
      return value.trim();
    };

    await this.prismaService.$transaction([
      this.prismaService.invitation.update({
        where: { uniqueId },
        data: {
          bestMan: body.bestMan,
          maidOfHonor: body.maidOfHonor,
          groomsMen: body.groomsMen,
          bridesMaids: body.bridesMaids,
          bestManLabel: normalizeLabel(body.bestManLabel),
          maidOfHonorLabel: normalizeLabel(body.maidOfHonorLabel),
          groomsMenLabel: normalizeLabel(body.groomsMenLabel),
          bridesMaidsLabel: normalizeLabel(body.bridesMaidsLabel),
        },
      }),
      this.prismaService.invitationEntourage.deleteMany({
        where: { invitationId: invitation.id },
      }),
      ...(sanitizedInvitationEntourageList.length
        ? [
            this.prismaService.invitationEntourage.createMany({
              data: sanitizedInvitationEntourageList.map((item) => ({
                invitationId: invitation.id,
                label: item.label,
                name: item.name,
                order: item.order,
              })),
            }),
          ]
        : []),
    ]);

    return this.findOne(uniqueId);
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

  async updateNotice(uniqueId: string, userId: number, notice: string) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
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
    userId: number,
    title?: string,
    description?: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
      },
    });
    return updated;
  }

  async updateRsvpTitle(uniqueId: string, userId: number, rsvpTitle: string) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpTitle,
      },
    });
    return updated;
  }

  async updateRsvpMaxPax(uniqueId: string, userId: number, rsvpMaxPax: number) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpMaxPax,
      },
    });
    return updated;
  }

  async updateRsvpDeadline(
    uniqueId: string,
    userId: number,
    rsvpDeadline: string | null,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
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
        hasRsvpDeadline: rsvpDeadline ? true : false,
      },
    });
    return updated;
  }

  async updateHasRsvpDeadline(
    uniqueId: string,
    userId: number,
    hasRsvpDeadline: boolean,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        hasRsvpDeadline,
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

    const keysToDelete = rawKeys.filter((key): key is string =>
      Boolean(key && !key.startsWith('assets/')),
    );

    await Promise.all(keysToDelete.map((key) => deleteFromS3(key)));
    await this.prismaService.invitation.delete({
      where: { id: invitation.id },
    });
    return { deleted: 1 };
  }

  async updateRsvpDeadlineDesc(
    uniqueId: string,
    userId: number,
    rsvpDeadlineDesc: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpDeadlineDesc,
      },
    });
    return updated;
  }

  async updateRsvpHasFood(
    uniqueId: string,
    userId: number,
    rsvpHasFood: boolean,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        rsvpHasFood,
      },
    });
    return updated;
  }

  async updateRsvpPopup(
    uniqueId: string,
    userId: number,
    isRsvpPopup: boolean,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        isRsvpPopup,
      },
    });
    return updated;
  }

  async layoutOrderUpdate(
    uniqueId: string,
    userId: number,
    layoutOrder: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
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
    userId: number,
    bankAccount: string,
    wishlistText: string,
    wishlistUrl: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
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

  async updateFont(uniqueId: string, userId: number, font: string) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        baseFont: font,
      },
    });
    return updated;
  }

  async updateEndingText(
    uniqueId: string,
    userId: number,
    endingText: string,
  ) {
    await this.assertInvitationOwnership(uniqueId, userId);
    await this.assertNotLocked(uniqueId);
    const updated = await this.prismaService.invitation.update({
      where: { uniqueId },
      data: {
        endingText,
      },
    });
    return updated;
  }
}
