import { IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @MinLength(1)
  @IsString()
  readonly subject: string;

  @IsString()
  readonly markdown: string;
}
