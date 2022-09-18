import { mockUser } from './../../../../../mock/model/user.mock';
import { GeneratePasswordService } from './../../../../../../src/microservice/domain/service/auth/generate-password.service';
import {
  mockValidateUserService,
  mockGeneratePasswordService
} from './../../../../../mock/service/auth-service.mock';
import { ValidateUserService } from './../../../../../../src/microservice/domain/service/auth/validate-user.service';
import { mockMailService } from './../../../../../mock/service/mail-service.mock';
import { ResetPasswordService } from './../../../../../../src/microservice/domain/service/security/reset-password.service';
import { MailService } from '../../../../../../src/microservice/domain/service/mail/mail.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('ResetPasswordService', () => {
  let sut: ResetPasswordService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordService],
      providers: [
        {
          provide: MailService,
          useValue: mockMailService
        },
        {
          provide: ValidateUserService,
          useValue: mockValidateUserService
        },
        {
          provide: GeneratePasswordService,
          useValue: mockGeneratePasswordService
        }
      ]
    }).compile();

    sut = app.get<ResetPasswordService>(ResetPasswordService);
  });

  describe('requestResetPassword', () => {
    it('Should call requestResetPassword and call sendMail correctly', async () => {
      const getUserStub = sinon
        .stub(mockValidateUserService, 'validateIfUserExistsDB')
        .returns(mockUser());

      const passwordStub = sinon
        .stub(mockGeneratePasswordService, 'resetPassword')
        .returns('any_new_pass');

      const mailSpy = sinon.spy(mockMailService, 'sendEmail');

      const actual = await sut.requestResetPassword('any_email');

      expect(actual).to.be.deep.equal({
        success: true,
        response: `New password sent by email(any_email)! OBS: Check the spam...`
      });

      sinon.assert.calledOnceWithExactly(
        mailSpy,
        'any_email',
        'Password Reset',
        './confirmation.hbs',
        {
          user: mockUser(),
          password: 'any_new_pass'
        }
      );

      mailSpy.restore();
      passwordStub.restore();
      getUserStub.restore();
    });
  });
});
