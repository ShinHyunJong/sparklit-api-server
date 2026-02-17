import { IsEnum, IsInt, Min } from 'class-validator';

enum PlanCode {
  KEEPSAKE = 'KEEPSAKE',
  HEIRLOOM = 'HEIRLOOM',
}

export class CreateCheckoutDto {
  @IsInt()
  @Min(1)
  invitationId: number;

  @IsEnum(PlanCode)
  planCode: PlanCode;
}

export { PlanCode };
