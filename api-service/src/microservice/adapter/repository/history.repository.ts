import { Stat } from './../../domain/model/stat.model';
import {
  StockHistory,
  StockHistoryDocument
} from '../../domain/schema/stock-history.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '../../domain/repository/mongoose.repository';

@Injectable()
export class StockHistoryMongooseRepository extends MongooseRepository<
  StockHistory,
  StockHistoryDocument
> {
  constructor(
    @InjectModel(StockHistory.name)
    model: Model<StockHistoryDocument>
  ) {
    super(model);
  }

  async groupByStack(): Promise<Stat[]> {
    const res = await this.groupBy({ symbol: '$symbol' });

    return res
      .filter((item) => item.count > 0)
      .map((item) => {
        return {
          stock: item._id.symbol,
          times_requested: item.count
        };
      });
  }
}
