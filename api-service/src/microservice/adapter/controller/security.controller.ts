import { CustomResponse } from './../../../core/interface/custom-response.interface';
import { ResetPasswordService } from './../../domain/service/security/reset-password.service';
import { Controller, Post, Query } from '@nestjs/common';

@Controller()
export class SecurityController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('/reset-password')
  async getStock(@Query('email') email: string): Promise<CustomResponse> {
    return this.resetPasswordService.requestResetPassword(email);
  }
}
