import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateCategoryDto {
  @IsInt()
  @Min(1)
  category_number!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  active?: boolean;
}