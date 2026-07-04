import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

const PAYMENT_TYPES = [
  // E-wallets
  'GCASH',
  'MAYA',
  // Banks
  'AUB',
  'BANKCOM',
  'BDO',
  'BPI',
  'CHINABANK',
  'EASTWEST',
  'GOTYME',
  'METROBANK',
  'PBCOM',
  'PNB',
  'RCBC',
  'SEABANK',
  'SECURITY_BANK',
  'UNIONBANK',
  // Free-text bank/wallet not in the preset list; name stored in customLabel.
  'OTHER',
] as const;
export type PaymentMethodType = (typeof PAYMENT_TYPES)[number];

export class CreatePaymentMethodDto {
  @IsEnum(PAYMENT_TYPES)
  type: PaymentMethodType;

  // Free-text bank/wallet name, used when type is 'OTHER'.
  @IsOptional()
  @IsString()
  @MaxLength(100)
  customLabel?: string;

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
  customLabel?: string;

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
