import { GeneratePasswordService } from '../auth/generate-password.service';
import { CustomResponse } from '../../../../core/interface/custom-response.interface';
import { ValidateUserService } from '../auth/validate-user.service';
import { Injectable } from '@nestjs/common';
import { AbstractService } from '../abstract.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ResetPasswordService extends AbstractService {
  constructor(
    protected readonly mailService: MailService,
    protected readonly validateUserService: ValidateUserService,
    protected readonly generatePasswordService: GeneratePasswordService
  ) {
    super();
  }

  async requestResetPassword(email: string): Promise<CustomResponse> {
    const user = await this.validateUserService.validateIfUserExistsDB(email);

    const newPassword = await this.generatePasswordService.resetPassword(email);

    await this.mailService.sendEmail(
      email,
      'Password Reset',
      './confirmation.hbs',
      {
        user,
        password: newPassword
      }
    );

    return {
      success: true,
      response: `New password sent by email(${email})! OBS: Check the spam...`
    };
  }
}
