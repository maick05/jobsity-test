import { ConfirmResetPasswordDTO } from './../../domain/model/dto/confirm-reset-password.dto';
import { CustomResponse } from './../../../core/interface/custom-response.interface';
import { RequestResetPasswordService } from '../../domain/service/security/request-reset-password.service';
import { Body, Controller, Post, Query } from '@nestjs/common';
import {
  ConfirmResetPasswordService,
  PasswordResetedResponse
} from '../../domain/service/security/confirm-reset-password.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotAcceptableResponse,
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
  constructor(
    private readonly resetPasswordService: RequestResetPasswordService,
    private readonly confirmResetPasswordService: ConfirmResetPasswordService
  ) {}

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

  @ApiOkResponse({
    description: 'Password reseted!',
    isArray: false,
    type: PasswordResetedResponse
  })
  @ApiNotFoundResponse({
    description: 'User not found!'
  })
  @ApiNotAcceptableResponse({
    description: 'Invalid security code'
  })
  @ApiNotAcceptableResponse({
    description: 'Security Token Expired!'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiBody({
    required: true,
    description: 'User information to Confirm Reset Password',
    type: ConfirmResetPasswordDTO
  })
  @Post('/reset-password/confirm')
  async confirmResetPassword(
    @Body() confirmDTO: ConfirmResetPasswordDTO
  ): Promise<CustomResponse> {
    return this.confirmResetPasswordService.confirmResetPassword(confirmDTO);
  }
}
