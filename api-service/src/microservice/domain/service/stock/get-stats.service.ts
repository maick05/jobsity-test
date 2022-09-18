import { StockHistoryMongooseRepository } from '../../../adapter/repository/stock-history.repository';
import { Injectable } from '@nestjs/common';
import { AbstractService } from '../abstract.service';
import { Stat } from '../../model/stat.model';

@Injectable()
export class GetStatsService extends AbstractService {
  constructor(
    protected readonly historyMongooseRepository: StockHistoryMongooseRepository
  ) {
    super();
  }

  async getStats(): Promise<Stat[]> {
    return (await this.historyMongooseRepository.groupByStack())
      .sort((a, b) => b.times_requested - a.times_requested)
      .slice(0, 5);
  }
}
