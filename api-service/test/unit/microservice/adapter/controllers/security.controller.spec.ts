import { mockResetPasswordService } from './../../../../mock/service/security-service.mock';
import { SecurityController } from './../../../../../src/microservice/adapter/controller/security.controller';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { ResetPasswordService } from '../../../../../src/microservice/domain/service/security/reset-password.service';

describe('SecurityController', () => {
  let sut: SecurityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecurityController],
      providers: [
        {
          provide: ResetPasswordService,
          useValue: mockResetPasswordService
        }
      ]
    }).compile();

    sut = app.get<SecurityController>(SecurityController);
  });

  describe('requestResetPassword', () => {
    it('Should call requestResetPassword and return a json response', async () => {
      const serviceStub = sinon
        .stub(mockResetPasswordService, 'requestResetPassword')
        .returns({
          success: true,
          response: `New password sent by email(any_email)! OBS: Check the spam...`
        });

      const actual = await sut.requestResetPassword('any_email');

      expect(actual).to.be.deep.equal({
        success: true,
        response: `New password sent by email(any_email)! OBS: Check the spam...`
      });

      serviceStub.restore();
    });
  });
});
