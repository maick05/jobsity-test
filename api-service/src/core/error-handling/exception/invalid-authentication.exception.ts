import { HttpStatus } from '@nestjs/common';
import { CustomErrorException } from './custom-error.exception';

export class InvalidAuthenticationException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }

  getStatus() {
    return HttpStatus.UNAUTHORIZED;
  }
}
