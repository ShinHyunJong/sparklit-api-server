import { IsEnum, IsInt, IsOptional, IsUrl, Min } from 'class-validator';

enum PlanCode {
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export class CreateCheckoutDto {
  @IsInt()
  @Min(1)
  invitationId: number;

  @IsEnum(PlanCode)
  planCode: PlanCode;

  @IsOptional()
  @IsUrl({ require_tld: false })
  frontendOrigin?: string;
}

export { PlanCode };
