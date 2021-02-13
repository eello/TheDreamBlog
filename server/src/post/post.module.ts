import { Module } from '@nestjs/common';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TagRepository } from 'src/tag/tag.repository';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, TagRepository]), LoggerModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
