import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/config';
import { MysqlConfig } from './config/mysql.config';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfig,
    }),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
