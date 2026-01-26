import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateInvitationMetaDto {
  @IsOptional()
  @IsString()
  @MaxLength(60)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  description?: string;
}
