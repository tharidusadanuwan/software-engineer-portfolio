import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProjectDto {
  @IsInt()
  @Min(1)
  project_number!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  categoryId!: number;

  @IsInt()
  @Min(0)
  duration!: number;

  @IsOptional()
  @IsString()
  @IsUrl(
    {
      require_protocol: true,
    },
    {
      message:
        'project_link must be a valid URL',
    },
  )
  project_link?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}