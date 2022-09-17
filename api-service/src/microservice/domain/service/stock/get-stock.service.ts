import { EmptyPropException } from './../../../../core/error-handling/exception/empty-prop.exception';
import { NotFoundException } from '../../../../core/error-handling/exception/not-found.exception';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stock } from '../../model/stock.model';
import { HttpClientService } from '../http-client.service';
import { LogHistoryService } from './log-history.service';

@Injectable()
export class GetStockService extends HttpClientService {
  constructor(
    httpService: HttpService,
    configService: ConfigService,
    private readonly logHistoryService: LogHistoryService
  ) {
    super(configService.get('stock-api.url'), httpService);
  }

  async getStock(stock: string, userEmail: string): Promise<Stock> {
    if (!stock || stock.length === 0)
      throw new EmptyPropException('Stock Quote(q)');

    const response = await this.get(`/stock/${stock}`);

    if (response.data.length === 0)
      throw new NotFoundException(`Stock '${stock}'`);

    await this.logHistoryService.logHistory(response.data[0], userEmail);

    return response.data[0];
  }
}
