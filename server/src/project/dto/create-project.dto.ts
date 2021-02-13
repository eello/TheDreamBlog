import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @MinLength(1)
  @IsString()
  readonly subject: string;

  @ApiProperty()
  @IsString()
  readonly markdown: string;
}
