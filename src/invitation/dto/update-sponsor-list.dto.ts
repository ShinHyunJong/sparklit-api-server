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

export class UpdateInvitationSponsorItemDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  // An empty label renders as names only — matches the legacy text behaviour.
  @IsString()
  @MaxLength(100)
  label: string;

  // Only used when the section renders as 2 columns and each side has its own
  // heading; blank means the left label spans both.
  @IsOptional()
  @IsString()
  @MaxLength(100)
  labelRight?: string;

  @IsString()
  nameLeft: string;

  @IsString()
  nameRight: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateSponsorListDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInvitationSponsorItemDto)
  invitationSponsorList?: UpdateInvitationSponsorItemDto[];

  @IsOptional()
  @IsInt()
  secondarySponsorColumns?: number;
}
