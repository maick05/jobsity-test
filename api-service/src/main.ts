import { CustomErrorExceptionFilter } from './core/error-handling/filter/custom-error-exception.filter';
import { ConfigService } from '@nestjs/config';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './microservice/app.module';
import { useContainer } from 'class-validator';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());

  const adapterHost = app.get<HttpAdapterHost>(HttpAdapterHost);

  app.useGlobalFilters(new CustomErrorExceptionFilter(adapterHost));

  await buildSwagger(app);

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<number>('api.port'));
}

async function buildSwagger(app: INestApplication): Promise<void> {
  const docApi = new DocumentBuilder()
    .addBasicAuth()
    .addBearerAuth()
    .setTitle('JobSity Challenge - API Service')
    .setDescription('JobSity Challenge - Maick Speck')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, docApi);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
}

bootstrap();
