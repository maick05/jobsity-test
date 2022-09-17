import { HttpStatus } from '@nestjs/common';
import { CustomErrorException } from './custom-error.exception';

export class InvalidCredentialsException extends CustomErrorException {
  constructor() {
    super(
      `Invalid Credentials!`,
      HttpStatus.UNAUTHORIZED,
      HttpStatus.UNAUTHORIZED
    );
  }
}
