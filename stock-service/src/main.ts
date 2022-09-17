import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './microservice/adapter/module/app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await buildSwagger(app);
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<number>('api.port'));
}

async function buildSwagger(app: INestApplication): Promise<void> {
  const docApi = new DocumentBuilder()
    .setTitle('JobSity Challenge - Stock Service')
    .setDescription('JobSity Challenge - Maick Speck')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, docApi);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
}

bootstrap();
