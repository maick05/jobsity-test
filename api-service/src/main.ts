import { CustomErrorExceptionFilter } from './core/error-handling/filters/custom-error-exception.filter';
import { ConfigService } from '@nestjs/config';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './microservice/app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());

  const adapterHost = app.get<HttpAdapterHost>(HttpAdapterHost);

  app.useGlobalFilters(new CustomErrorExceptionFilter(adapterHost));

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<number>('api.port'));
}
bootstrap();
