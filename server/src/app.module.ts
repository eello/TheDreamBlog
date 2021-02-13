import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import { config } from './config/config';
import { MysqlConfig } from './config/mysql.config';
import { LoggerModule } from './logger/logger.module';
import { Github2Module } from './github2/github2.module';
import { ProjectModule } from './project/project.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfig,
    }),
    LoggerModule,
    Github2Module,
    ProjectModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    const FOLDER_MARKDOWNS = `${__dirname}/../markdowns`;
    !fs.existsSync(FOLDER_MARKDOWNS) && fs.mkdirSync(FOLDER_MARKDOWNS); // markdowns 폴더가 존재하지 않을 경우 생성
  }
}
