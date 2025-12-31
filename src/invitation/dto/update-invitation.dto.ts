import { IsString } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class UpdateInvitationDto {
  @IsString()
  date: string;

  @IsString()
  brideLastName: string;

  @IsString()
  groomLastName: string;

  @IsString()
  brideFirstName: string;

  @IsString()
  groomFirstName: string;

  @IsString()
  brideMiddleName: string;

  @IsString()
  groomMiddleName: string;

  @IsString()
  brideMomName: string;

  @IsString()
  groomMomName: string;

  @IsString()
  brideDadName: string;

  @IsString()
  groomDadName: string;
}

export class UpdateMainPhotoDto {
  @IsFile()
  originalFile: MemoryStoredFile;

  @IsFile()
  croppedFile: MemoryStoredFile;

  @IsString()
  photoJSON: string;
}
