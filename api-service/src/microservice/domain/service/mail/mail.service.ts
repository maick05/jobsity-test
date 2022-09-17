import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AbstractService } from '../abstract.service';

@Injectable()
export class MailService extends AbstractService {
  constructor(private mailerService: MailerService) {
    super();
  }

  async sendEmail(
    email: string,
    subject: string,
    template: string,
    dataCtx: any
  ) {
    this.logger.log('Sending email...');
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: template,
      context: dataCtx
    });
    this.logger.log('Email successfully sent!');
  }
}
