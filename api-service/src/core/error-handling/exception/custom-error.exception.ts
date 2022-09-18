import { HttpException } from '@nestjs/common';

export class CustomErrorException extends HttpException {
  constructor(public message: string, status: number, public errCode: number) {
    super(message, status);
  }

  get type(): string {
    return this.constructor.name;
  }
}
