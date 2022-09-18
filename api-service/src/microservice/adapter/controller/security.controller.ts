import { CustomResponse } from './../../../core/interface/custom-response.interface';
import { ResetPasswordService } from '../../domain/service/security/reset-password.service';
import { Controller, Post, Query } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('security')
@ApiBearerAuth()
@Controller()
export class SecurityController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @ApiOkResponse({
    description: 'Password reset requested!',
    isArray: false,
    type: CustomResponse
  })
  @ApiNotFoundResponse({
    description: 'User not found!'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiQuery({
    name: 'email',
    description: 'User Email',
    example: 'jobsity@email.com'
  })
  @Post('/reset-password')
  async requestResetPassword(
    @Query('email') email: string
  ): Promise<CustomResponse> {
    return this.resetPasswordService.requestResetPassword(email);
  }
}
