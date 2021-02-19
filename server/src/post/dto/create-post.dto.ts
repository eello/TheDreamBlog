import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  readonly subject: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  readonly link: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly thumbnailUrl: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];
}
