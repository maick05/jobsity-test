import { HttpStatus } from '@nestjs/common';
import { CustomErrorException } from './custom-error.exception';

export class MongoDBException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 3);
  }
}
