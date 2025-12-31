import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePhotoDto } from './dto/photo.dto';
import { UploadingImage } from 'src/types/client.type';
import cryptoRandomString from 'crypto-random-string';
import { deleteFromS3, upload2S3 } from 'src/helpers/s3.helper';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class PhotoService {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadPhotoList(invitationId: string, body: CreatePhotoDto) {
    const uploadingPhotos: UploadingImage[] = JSON.parse(body.photoJSON);
    const originalFileList = body.originalPhotos;
    const croppedFileList = body.croppedPhotos;
    const thumbnailFileList = body.thumbnailPhotos;

    for (let i = 0; i < uploadingPhotos.length; i++) {
      const photo = uploadingPhotos[i];
      const originalFile = originalFileList[i];
      const croppedFile = croppedFileList[i];
      const thumbnailFile = thumbnailFileList[i];

      //s3Upload
      const originalName = cryptoRandomString({ length: 16 });
      const originalExtension = originalFile.mimeType.split('/')[1];
      const croppedName = cryptoRandomString({ length: 16 });
      const croppedExtension = croppedFile.mimeType.split('/')[1];
      const thumbnailName = cryptoRandomString({ length: 16 });
      const thumbnailExtension = thumbnailFile.mimeType.split('/')[1];

      const originalKey = `invitations/${invitationId}/photos/main/${originalName}.${originalExtension}`;
      const croppedKey = `invitations/${invitationId}/photos/cropped/${croppedName}.${croppedExtension}`;
      const thumbKey = `invitations/${invitationId}/photos/thumbnail/${thumbnailName}.${thumbnailExtension}`;

      await upload2S3(originalKey, originalFile.buffer);
      await upload2S3(croppedKey, croppedFile.buffer);
      await upload2S3(thumbKey, thumbnailFile.buffer);

      const lastItem = await this.prismaService.invitationPhoto.findMany({
        where: { invitationId: invitationId },
        orderBy: { order: 'desc' },
        take: 1,
      });
      let nextOrder = 1;
      if (lastItem.length > 0) {
        nextOrder = lastItem[0].order + 1;
      }

      await this.prismaService.invitationPhoto.create({
        data: {
          invitationId: invitationId,
          originalKey: originalKey,
          croppedKey: croppedKey,
          thumbKey: thumbKey,
          order: nextOrder,
          cropX: photo.crop.x,
          cropY: photo.crop.y,
          thumbX: photo.thumbCrop.x,
          thumbY: photo.thumbCrop.y,
          width: photo.width,
          height: photo.height,
          cropZoom: photo.zoom,
          thumbZoom: photo.thumbZoom,
        },
      });
    }
  }

  async updatePhotoCrop(
    photoId: number,
    isThumb: boolean,
    file: MemoryStoredFile,
    cropX: number,
    cropY: number,
    cropZoom: number,
  ) {
    let prevCropX;
    let prevCropY;
    let prevCropZoom;
    const prevPhoto = await this.prismaService.invitationPhoto.findUnique({
      where: { id: photoId },
    });
    if (isThumb) {
      prevCropX = prevPhoto.thumbX;
      prevCropY = prevPhoto.thumbY;
      prevCropZoom = prevPhoto.thumbZoom;
    } else {
      prevCropX = prevPhoto.cropX;
      prevCropY = prevPhoto.cropY;
      prevCropZoom = prevPhoto.cropZoom;
    }
    const hasChanged =
      prevCropX !== cropX || prevCropY !== cropY || prevCropZoom !== cropZoom;
    if (hasChanged) {
      const deleteKey = isThumb ? prevPhoto.thumbKey : prevPhoto.croppedKey;
      const name = cryptoRandomString({ length: 16 });
      const extension = file.mimeType.split('/')[1];
      const key = `invitations/${prevPhoto.invitationId}/photos/${isThumb ? 'thumbnail' : 'cropped'}/${name}.${extension}`;
      await upload2S3(key, file.buffer);
      if (isThumb) {
        await this.prismaService.invitationPhoto.update({
          where: { id: photoId },
          data: {
            thumbX: cropX,
            thumbY: cropY,
            thumbZoom: cropZoom,
            thumbKey: key,
          },
        });
      } else {
        await this.prismaService.invitationPhoto.update({
          where: { id: photoId },
          data: {
            cropX: cropX,
            cropY: cropY,
            cropZoom: cropZoom,
            croppedKey: key,
          },
        });
      }
      await deleteFromS3(deleteKey);
    }
  }

  async updatePhotoOrder(photoIds: number[]) {
    for (let i = 0; i < photoIds.length; i++) {
      const photoId = photoIds[i];
      await this.prismaService.invitationPhoto.update({
        where: { id: photoId },
        data: { order: i + 1 },
      });
    }
  }

  async deletePhoto(photoId: number) {
    const photo = await this.prismaService.invitationPhoto.findUnique({
      where: { id: photoId },
    });
    if (photo) {
      await deleteFromS3(photo.originalKey);
      await deleteFromS3(photo.croppedKey);
      await deleteFromS3(photo.thumbKey);
      await this.prismaService.invitationPhoto.delete({
        where: { id: photoId },
      });
    }
  }
}
