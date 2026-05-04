import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateGuestGroupDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  password?: string;

  @IsOptional()
  @IsEnum(['groom', 'bride', 'common'])
  side?: 'groom' | 'bride' | 'common';

  @IsOptional()
  @IsInt()
  @Min(1)
  maxPax?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  rsvpTitle?: string;

  @IsOptional()
  layoutOverride?: any;

  @IsOptional()
  @IsString()
  memo?: string;
}

export class UpdateGuestGroupDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  password?: string;

  @IsOptional()
  @IsEnum(['groom', 'bride', 'common'])
  side?: 'groom' | 'bride' | 'common';

  @IsOptional()
  @IsInt()
  @Min(1)
  maxPax?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  rsvpTitle?: string;

  @IsOptional()
  layoutOverride?: any;

  @IsOptional()
  @IsString()
  memo?: string;
}

export class UpdateGuestSettingsDto {
  @IsOptional()
  isPasswordProtected?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  universalPassword?: string;

  @IsOptional()
  guestListEnabled?: boolean;
}

export class VerifyPasswordDto {
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}

export class LinkRsvpDto {
  @IsInt()
  @Min(1)
  rsvpId: number;
}
