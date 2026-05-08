import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

const PAYMENT_TYPES = ['GCASH', 'BPI', 'BDO'] as const;
export type PaymentMethodType = (typeof PAYMENT_TYPES)[number];

export class CreatePaymentMethodDto {
  @IsEnum(PAYMENT_TYPES)
  type: PaymentMethodType;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accountName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accountNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  qrImageKey?: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdatePaymentMethodDto {
  @IsOptional()
  @IsEnum(PAYMENT_TYPES)
  type?: PaymentMethodType;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accountName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accountNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  qrImageKey?: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
