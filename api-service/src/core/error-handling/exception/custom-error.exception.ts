import { HttpException } from '@nestjs/common';

export class CustomErrorException extends HttpException {
  public statusCode: number;
  constructor(public message: string, status: number, public errCode: number) {
    super(message, status);
    this.statusCode = status;
  }

  getStatus(){
    return this.statusCode;
  }

  get type(): string {
    return this.constructor.name;
  }
}
