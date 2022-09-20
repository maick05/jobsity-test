import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as supertest from 'supertest';
import { expect } from 'chai';
import { AppModule } from '../../src/microservice/app.module';

jest.setTimeout(50000);

const userTest = 'user.e2e@tests.com';
const passwordUserTest = 'd1e7555181c5d2b611103af3575ad2b5';

describe('App (e2e) ', () => {
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

  describe('Controllers (e2e) ', () => {
    let token = '';

    beforeEach(async () => {
      const actual = await supertest(app.getHttpServer())
        .post('/login')
        .auth(userTest, passwordUserTest);
      token = actual.body.token;
    });

    describe('StockController (e2e) ', () => {
      describe('stock (e2e) ', () => {
        it('/stock?q=:stock (GET)', async () => {
          const actual1 = await supertest(app.getHttpServer())
            .get('/stock?q=googl.us')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
          expect(actual1.body).to.be.an('object');
        });
      });
    });
  });
});
