import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateProjectTechnologyDto {
  @IsString()
  @IsNotEmpty()
  technology!: string;
}