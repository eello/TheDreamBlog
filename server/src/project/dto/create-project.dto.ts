import { IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly subject: string;

  @IsString()
  readonly markdown: string;
}
