import { Module } from '@nestjs/common';
import { StockController } from '../controller/stock.controller';
import { GetStockService } from '../../domain/service/get-stock.service';
import { ConfigurationModule } from './configuration.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigurationModule, HttpModule],
  controllers: [StockController],
  providers: [GetStockService]
})
export class StockModule {}
