import { StockHistoryMongooseRepository } from '../../../adapter/repository/stock-history.repository';
import { Injectable } from '@nestjs/common';
import { AbstractService } from '../abstract.service';
import { StockHistory } from '../../schema/stock-history.schema';

@Injectable()
export class GetHistoryService extends AbstractService {
  constructor(
    protected readonly historyMongooseRepository: StockHistoryMongooseRepository
  ) {
    super();
  }

  async getHistory(userEmail: string): Promise<StockHistory[]> {
    return this.historyMongooseRepository.find(
      {
        userEmail
      },
      { _id: 0, userEmail: 0, createdAt: 0, updatedAt: 0, __v: 0 },
      { date: -1 }
    );
  }
}
