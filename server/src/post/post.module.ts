import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TagRepository } from 'src/tag/tag.repository';
import { LoggerModule } from 'src/logger/logger.module';
import { UnAuthMiddleware } from 'src/middleware/un-auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Post, TagRepository]), LoggerModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV === 'production') {
      consumer
        .apply(UnAuthMiddleware)
        .exclude({ path: '/thedream.api/post', method: RequestMethod.GET })
        .forRoutes('project');
    }
  }
}
