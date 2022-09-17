import { HttpStatus } from '@nestjs/common';
import { CustomErrorException } from './custom-error.exception';

export class InvalidSecurityCodeException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_ACCEPTABLE, 4);
  }
}
