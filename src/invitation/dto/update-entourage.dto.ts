import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class UpdateInvitationEntourageItemDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  @IsString()
  @MaxLength(100)
  label: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateEntourageDto {
  @IsString()
  bestMan: string;

  @IsString()
  maidOfHonor: string;

  @IsString()
  groomsMen: string;

  @IsString()
  bridesMaids: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInvitationEntourageItemDto)
  invitationEntourageList?: UpdateInvitationEntourageItemDto[];
}
