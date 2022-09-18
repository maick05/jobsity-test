import { mockMailerService } from './../../../../../mock/service/mail-service.mock';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from './../../../../../../src/microservice/domain/service/mail/mail.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';

describe('MailService', () => {
  let sut: MailService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailService],
      providers: [
        {
          provide: MailerService,
          useValue: mockMailerService
        }
      ]
    }).compile();

    sut = app.get<MailService>(MailService);
  });

  describe('sendEmail', () => {
    it('Should call sendEmail and call sendMail correctly', async () => {
      const mailSpy = sinon.spy(mockMailerService, 'sendMail');

      await sut.sendEmail('any_email', 'any_subject', 'any_template', {
        password: 'any_pass'
      });

      sinon.assert.calledOnceWithExactly(mailSpy, {
        to: 'any_email',
        subject: 'any_subject',
        template: 'any_template',
        context: { password: 'any_pass' }
      });

      mailSpy.restore();
    });
  });
});
