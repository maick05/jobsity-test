import { UserResponse } from './../../domain/service/auth/register-user.service';
import { TokenResponse } from './../../domain/service/auth/login.service';
import { LocalAuthGuard } from '../../../core/auth/local/local-auth.guard';
import { LoginService } from '../../domain/service/auth/login.service';
import { CreateUserDTO } from '../../domain/model/dto/create-user.dto';
import { RegisterUserService } from '../../domain/service/auth/register-user.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatorExtractorHelper } from '../helper/authenticator-extractor.helper';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly loginService: LoginService
  ) {}

  @ApiOkResponse({
    description: 'User created!',
    isArray: false,
    type: UserResponse
  })
  @ApiBadRequestResponse({
    description: 'User with the requested e-mail already exists!'
  })
  @ApiBody({
    required: true,
    description: 'User information',
    type: CreateUserDTO
  })
  @Post('/register')
  async register(@Body() user: CreateUserDTO) {
    return this.registerUserService.register(user);
  }

  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'User authenticated, token generated!',
    isArray: false,
    type: TokenResponse
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials!'
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.loginService.login(
      AuthenticatorExtractorHelper.ExtractBasicAuth(req.headers.authorization)
    );
  }
}
