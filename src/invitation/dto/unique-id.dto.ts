import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUniqueIdDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/^[a-z0-9._-]+$/)
  newUniqueId: string;
}

export class CheckUniqueIdDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/^[a-z0-9._-]+$/)
  value: string;

  @IsOptional()
  @IsString()
  currentUniqueId?: string;
}
