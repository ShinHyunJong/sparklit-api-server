import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PlaceDto {
  @IsString()
  googlePlaceId: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;
}
