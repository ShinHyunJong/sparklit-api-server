import { IsBoolean, IsOptional, IsString } from 'class-validator';

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
}
