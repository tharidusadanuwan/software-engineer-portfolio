import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateProjectTechnologyDto {
  @IsString()
  @IsNotEmpty()
  technology!: string;
}