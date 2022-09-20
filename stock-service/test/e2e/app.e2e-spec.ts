import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as supertest from 'supertest';
import { AppModule } from '../../src/microservice/adapter/module/app.module';
import { expect } from 'chai';

jest.setTimeout(20000);

describe('StockController (e2e) ', () => {
  let app: INestApplication;

  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    app.close();
    done();
  });

  beforeEach(async function () {
    app = await NestFactory.create(AppModule);
    await app.init();
  });

  afterEach(async function () {
    await app.close();
  });

  describe('Stock (e2e) ', () => {
    it('/stock/:stock (GET)', async () => {
      const actual = await supertest(app.getHttpServer()).get('/stock/amzn.us').expect(200);
      expect(actual.body).to.be.an('array').that.is.not.empty;
    });
  });
});
