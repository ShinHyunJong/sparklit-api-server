import { IsString } from 'class-validator';
import { IsFiles, MemoryStoredFile } from 'nestjs-form-data';

export class CreatePhotoDto {
  @IsFiles()
  originalPhotos: MemoryStoredFile[];

  @IsFiles()
  croppedPhotos: MemoryStoredFile[];

  @IsFiles()
  thumbnailPhotos: MemoryStoredFile[];

  @IsString()
  photoJSON: string;
}
