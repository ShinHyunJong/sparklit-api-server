import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

/** A single color within a dress-code group. */
export class DressCodeGroupColorDto {
  @IsString()
  @Matches(/^#?[0-9a-fA-F]{3,8}$/, { message: 'Invalid color' })
  color: string;

  @IsOptional()
  @IsInt()
  order?: number;
}

/** One dress-code group in the snapshot. `id` present = update, absent = create. */
export class DressCodeGroupDto {
  @IsOptional()
  @IsInt()
  id?: number;

  // null = never set (use default label); string = user value (may be empty).
  @IsOptional()
  @IsString()
  @MaxLength(100)
  label?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DressCodeGroupColorDto)
  colors?: DressCodeGroupColorDto[];
}

/** Whole-list snapshot: PUT /invitation/dressCodeGroups/:uid */
export class UpdateDressCodeGroupsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DressCodeGroupDto)
  groups: DressCodeGroupDto[];
}
