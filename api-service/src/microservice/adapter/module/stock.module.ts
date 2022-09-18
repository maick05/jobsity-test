import {
  StockHistory,
  StockHistorySchema
} from './../../domain/schema/stock-history.schema';
import { LogHistoryService } from './../../domain/service/stock/log-history.service';
import { GetStockService } from '../../domain/service/stock/get-stock.service';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { ConfigurationModule } from './configuration.module';
import { StockController } from '../controller/stock.controller';
import { HttpModule } from '@nestjs/axios';
import { StockHistoryMongooseRepository } from '../repository/stock-history.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { GetHistoryService } from '../../domain/service/stock/get-history.service';
import { GetStatsService } from '../../domain/service/stock/get-stats.service';

@Module({
  imports: [
    AuthModule,
    ConfigurationModule,
    HttpModule,
    MongooseModule.forFeature([
      { name: StockHistory.name, schema: StockHistorySchema }
    ])
  ],
  controllers: [StockController],
  providers: [
    GetStockService,
    StockHistoryMongooseRepository,
    LogHistoryService,
    GetHistoryService,
    GetStatsService
  ],
  exports: [GetStockService]
})
export class StockModule {}
