import { DateHelper } from '../../../adapter/helper/date.helper';
import { CustomResponse } from '../../../../core/interface/custom-response.interface';
import { ValidateUserService } from '../auth/validate-user.service';
import { RandomHelper } from '../../../adapter/helper/random.helper';
import { SecurityTokenMongooseRepository } from '../../../adapter/repository/security-token.repository';
import { Injectable } from '@nestjs/common';
import { AbstractService } from '../abstract.service';
import { MailService } from '../mail/mail.service';
import { SecurityToken } from '../../schema/security-tokens.schema';

@Injectable()
export class RequestResetPasswordService extends AbstractService {
  constructor(
    protected readonly securityTokenRepository: SecurityTokenMongooseRepository,
    protected readonly mailService: MailService,
    protected readonly validateUserService: ValidateUserService
  ) {
    super();
  }

  async requestResetPassword(email: string): Promise<CustomResponse> {
    const user = await this.validateUserService.validateIfUserExistsDB(email);
    const code = RandomHelper.GenerateRandomNumber(6);

    await this.generateToken(email, code);

    await this.mailService.sendEmail(
      email,
      'Password Reset',
      './confirmation.hbs',
      {
        user,
        code
      }
    );

    return {
      success: true,
      response: `Code to reset password sent by email(${email})! OBS: Check the spam...`
    };
  }

  async generateToken(email: string, code: number): Promise<void> {
    await this.securityTokenRepository.inactiveActualTokens(email);

    const token = new SecurityToken();
    token.active = true;
    token.userEmail = email;
    token.code = code;
    token.date = DateHelper.GetServerDateNow();
    token.expireDate = DateHelper.SetAddDate('3h');
    await this.securityTokenRepository.insertOne(token, 'Security Token');
  }
}
