import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stock } from '../model/stock.model';
import { HttpClientService } from './http-client.service';

@Injectable()
export class GetStockService extends HttpClientService {
  constructor(httpService: HttpService, configService: ConfigService) {
    super(configService.get('external-api.url'), httpService);
  }

  async getStock(stock: string): Promise<Stock[]> {
    const response = await this.get(`&s=${stock}`);
    return response.data.symbols.filter((item) => item.name);
  }
}
