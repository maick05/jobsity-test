import { UserDTO } from './../../domain/model/user.dto';
import { RegisterUserService } from './../../domain/services/auth/register-user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class UsersController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @Post('/register')
  async register(@Body() user: UserDTO) {
    return this.registerUserService.register(user);
  }
}
