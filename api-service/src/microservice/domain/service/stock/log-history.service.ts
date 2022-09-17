import { DateHelper } from './../../../adapter/helper/date.helper';
import { StockHistoryMongooseRepository } from './../../../adapter/repository/history.repository';
import { Injectable } from '@nestjs/common';
import { AbstractService } from '../abstract.service';
import { Stock } from '../../model/stock.model';
import { StockHistory } from '../../schema/stock-history.schema';

@Injectable()
export class LogHistoryService extends AbstractService {
  constructor(
    protected readonly historyMongooseRepository: StockHistoryMongooseRepository
  ) {
    super();
  }

  async logHistory(stock: Stock, userEmail: string): Promise<void> {
    const log = new StockHistory();
    log.userEmail = userEmail;
    log.date = DateHelper.GetServerDateNow();
    log.name = stock.name;
    log.symbol = stock.symbol;
    log.high = stock.high;
    log.low = stock.low;
    log.open = stock.open;
    log.close = stock.close;
    await this.historyMongooseRepository.insertOne(log, 'Stock History');
  }
}
