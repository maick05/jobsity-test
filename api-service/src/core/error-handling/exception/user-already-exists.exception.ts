import { HttpStatus } from '@nestjs/common';
import { CustomErrorException } from './custom-error.exception';

export class UserAlreadyExistsException extends CustomErrorException {
  constructor(public email: string) {
    super(
      `User with email '${email}' already exists!`,
      HttpStatus.BAD_REQUEST,
      1
    );
  }
}
