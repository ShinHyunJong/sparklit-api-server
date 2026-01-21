import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class RsvpDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  side: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsBoolean()
  attending: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  pax?: number;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsOptional()
  @IsString()
  food?: string;
}
