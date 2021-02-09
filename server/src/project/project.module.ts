import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { UnAuthMiddleware } from 'src/middleware/un-auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), LoggerModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UnAuthMiddleware)
      .exclude(
        { path: '/thedream.api/project', method: RequestMethod.GET },
        { path: '/thedream.api/project/:id', method: RequestMethod.GET },
      )
      .forRoutes('project');
  }
}
