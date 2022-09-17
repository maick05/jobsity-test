import { ConfirmResetPasswordDTO } from './../../domain/model/dto/confirm-reset-password.dto';
import { CustomResponse } from './../../../core/interface/custom-response.interface';
import { RequestResetPasswordService } from '../../domain/service/security/request-reset-password.service';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { ConfirmResetPasswordService } from '../../domain/service/security/confirm-reset-password.service';

@Controller()
export class SecurityController {
  constructor(
    private readonly resetPasswordService: RequestResetPasswordService,
    private readonly confirmResetPasswordService: ConfirmResetPasswordService
  ) {}

  @Post('/reset-password')
  async requestResetPassword(
    @Query('email') email: string
  ): Promise<CustomResponse> {
    return this.resetPasswordService.requestResetPassword(email);
  }

  @Post('/reset-password/confirm')
  async confirmResetPassword(
    @Body() confirmDTO: ConfirmResetPasswordDTO
  ): Promise<CustomResponse> {
    return this.confirmResetPasswordService.confirmResetPassword(confirmDTO);
  }
}
