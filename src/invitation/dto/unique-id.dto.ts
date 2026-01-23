import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUniqueIdDto {
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  @Matches(/^[a-z0-9._]+$/)
  newUniqueId: string;
}

export class CheckUniqueIdDto {
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  @Matches(/^[a-z0-9._]+$/)
  value: string;

  @IsOptional()
  @IsString()
  currentUniqueId?: string;
}
