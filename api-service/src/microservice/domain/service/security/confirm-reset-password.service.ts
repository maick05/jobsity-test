import { InvalidSecurityCodeException } from './../../../../core/error-handling/exception/invalid-code.exception';
import { DateHelper } from '../../../adapter/helper/date.helper';
import { CustomResponse } from '../../../../core/interface/custom-response.interface';
import { ValidateUserService } from '../auth/validate-user.service';
import { SecurityTokenMongooseRepository } from '../../../adapter/repository/security-token.repository';
import { Injectable } from '@nestjs/common';
import { AbstractService } from '../abstract.service';
import { MailService } from '../mail/mail.service';
import { ConfirmResetPasswordDTO } from '../../model/dto/confirm-reset-password.dto';
import { GeneratePasswordService } from '../auth/generate-password.service';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class ConfirmResetPasswordService extends AbstractService {
  constructor(
    protected readonly securityTokenRepository: SecurityTokenMongooseRepository,
    protected readonly mailService: MailService,
    protected readonly validateUserService: ValidateUserService,
    protected readonly generatePasswordService: GeneratePasswordService
  ) {
    super();
  }

  async confirmResetPassword(
    confirmDTO: ConfirmResetPasswordDTO
  ): Promise<PasswordResetedResponse> {
    await this.validateUserService.validateIfUserExistsDB(confirmDTO.email);

    await this.validateSecurityCode(confirmDTO);

    const newPassword = await this.generatePasswordService.resetPassword(
      confirmDTO.email
    );

    await this.securityTokenRepository.inactiveActualTokens(confirmDTO.email);

    return {
      success: true,
      response: `Password Reseted!`,
      password: newPassword
    };
  }

  async validateSecurityCode(
    confirmDTO: ConfirmResetPasswordDTO
  ): Promise<void> {
    const tokenDB = await this.securityTokenRepository.getActiveCode(
      confirmDTO.email
    );

    if (!tokenDB || tokenDB.code !== confirmDTO.code)
      throw new InvalidSecurityCodeException('Invalid security code');

    if (tokenDB.expireDate < DateHelper.GetServerDateNow())
      throw new InvalidSecurityCodeException('Security Token Expired!');
  }
}

export class PasswordResetedResponse extends CustomResponse {
  @ApiProperty({
    type: String,
    description: `New Generated Password`,
    example: 'new_password'
  })
  password: string;
}
