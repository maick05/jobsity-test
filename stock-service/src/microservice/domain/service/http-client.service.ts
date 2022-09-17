import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export abstract class HttpClientService {
  protected headersRequest: any;

  constructor(
    protected readonly url: string,
    protected readonly httpService: HttpService
  ) {}

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
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export interface AxiosResponse {
  status: number;
  data: any;
}
