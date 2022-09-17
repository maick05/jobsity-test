import { HttpStatus } from '@nestjs/common';
import { CustomErrorException } from './custom-error.exception';

export class ForbiddenException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN, HttpStatus.FORBIDDEN);
  }
}
