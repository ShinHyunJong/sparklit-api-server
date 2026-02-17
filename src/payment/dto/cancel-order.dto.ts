import { IsString, Length } from 'class-validator';

export class CancelOrderDto {
  @IsString()
  @Length(5, 60)
  orderNo: string;
}
