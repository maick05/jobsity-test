import { EnumUserRole } from './../../src/microservice/domain/enum/user-role.enum';
import { EnumBufferEncoding } from './../../src/microservice/domain/enum/buffer-encoding.enum';
import { RandomHelper } from './../../src/microservice/adapter/helper/random.helper';
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
      describe('stats (e2e) ', () => {
        it('/stats (GET)', async () => {
          const actual1 = await supertest(app.getHttpServer())
            .get('/stats')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
          expect(actual1.body).to.be.an('array').that.is.not.empty;
        });
      });

      describe('history (e2e) ', () => {
        it('/history (GET)', async () => {
          const actual1 = await supertest(app.getHttpServer())
            .get('/stats')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
          expect(actual1.body).to.be.an('array').that.is.not.empty;
        });
      });
    });

    describe('AuthController (e2e) ', () => {
      describe('register (e2e) ', () => {
        it('/register (POST)', async () => {
          const randomUser = RandomHelper.GenerateHashString(
            3,
            EnumBufferEncoding.HEX
          );
          const actual = await supertest(app.getHttpServer())
            .post('/register')
            .send({
              email: `any_user_test_${randomUser}@test.com`,
              role: EnumUserRole.USER
            })
            .expect(201);
          expect(actual.body.password !== undefined).to.be.equal(true);
        });
      });
    });
  });
});
