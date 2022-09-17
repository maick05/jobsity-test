import { CustomErrorException } from './../../../core/error-handling/exception/custom-error.exception';
import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AbstractService } from './abstract.service';

@Injectable()
export abstract class HttpClientService extends AbstractService {
  protected headersRequest: any;

  constructor(
    protected readonly url: string,
    protected readonly httpService: HttpService
  ) {
    super();
  }

  protected getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  async get(endpoint: string): Promise<AxiosResponse> {
    try {
      const response = await firstValueFrom(
        await this.httpService.get(`${this.url}${endpoint}`, {
          headers: this.getHeaders()
        })
      );
      return response;
    } catch (err) {
      throw new CustomErrorException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export interface AxiosResponse {
  status: number;
  data: any;
}
