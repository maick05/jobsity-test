import { User } from './../../domain/schemas/user.schema';
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() user: User) {
    return this.usersService.register(user);
  }
}
