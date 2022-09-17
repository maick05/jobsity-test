import { LocalAuthGuard } from './../../../core/auth/local/local-auth.guard';
import { LoginService } from './../../domain/services/auth/login.service';
import { CreateUserDTO } from './../../domain/model/dto/create-user.dto';
import { RegisterUserService } from '../../domain/services/auth/register-user.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatorExtractorHelper } from '../helper/authenticator-extractor.helper';

@Controller()
export class AuthController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly loginService: LoginService
  ) {}

  @Post('/register')
  async register(@Body() user: CreateUserDTO) {
    return this.registerUserService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.loginService.login(
      AuthenticatorExtractorHelper.ExtractBasicAuth(req.headers.authorization)
    );
  }
}
