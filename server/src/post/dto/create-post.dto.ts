import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  readonly subject: string;

  @IsString()
  @MinLength(1)
  readonly link: string;

  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];
}
