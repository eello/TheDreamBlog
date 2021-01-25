import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: true },
  });
  app.setGlobalPrefix('/thedream.api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /** morgan 설정 */
  const MORGAN_FORMAT = `:remote-addr - :remote-user ":method :url HTTP/:http-version" :status ":referrer" ":user-agent" :response-time ms`;
  app.use(
    morgan(MORGAN_FORMAT, { stream: app.get(LoggerService).getStream() }),
  );

  /** Swagger 설정 */
  const config = new DocumentBuilder()
    .setTitle('The Dream API')
    .setDescription('The Dream API for yours')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/thedream.api/docs', app, document);

  const PORT = app.get(ConfigService).get('port');
  await app.listen(PORT);
}
bootstrap();
