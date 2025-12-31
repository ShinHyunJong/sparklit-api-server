import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreatePhotoDto } from './dto/photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:invitationId')
  @FormDataRequest({ storage: MemoryStoredFile })
  uploadPhotoList(
    @Param('invitationId') invitationId: string,
    @Body() body: CreatePhotoDto,
  ) {
    return this.photoService.uploadPhotoList(invitationId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:photoId')
  @FormDataRequest({ storage: MemoryStoredFile })
  updatePhoto(
    @Param('photoId') photoId: number,
    @Body()
    {
      cropX,
      cropY,
      cropZoom,
      isThumb,
      file,
    }: {
      cropX: string;
      cropY: string;
      cropZoom: string;
      isThumb: string;
      file: MemoryStoredFile;
    },
  ) {
    return this.photoService.updatePhotoCrop(
      photoId,
      isThumb === 'true',
      file,
      Number(cropX),
      Number(cropY),
      Number(cropZoom),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/order')
  updatePhotoOrder(@Body() body: { photoIds: number[] }) {
    return this.photoService.updatePhotoOrder(body.photoIds);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:photoId')
  deletePhoto(@Param('photoId') photoId: number) {
    return this.photoService.deletePhoto(photoId);
  }
}
