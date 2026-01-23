import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export const dressColorTypes = ['gentleman', 'lady'] as const;
export type DressColorType = (typeof dressColorTypes)[number];

export class CreateDressColorDto {
  @IsString()
  @IsIn(dressColorTypes)
  type: DressColorType;

  @IsString()
  @Matches(/^#?[0-9a-fA-F]{6}$/)
  color: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(999)
  order?: number;
}

export class UpdateDressColorDto {
  @IsString()
  @Matches(/^#?[0-9a-fA-F]{6}$/)
  color: string;
}

export class UpdateDressColorOrderDto {
  @IsOptional()
  @IsString()
  @IsIn(dressColorTypes)
  type?: DressColorType;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  colorIds: number[];
}
