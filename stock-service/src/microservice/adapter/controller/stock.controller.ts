import { Stock } from '../../domain/model/stock.model';
import { Controller, Get, Param } from '@nestjs/common';
import { GetStockService } from '../../domain/service/get-stock.service';

@Controller()
export class StockController {
  constructor(private readonly getStockService: GetStockService) {}

  @Get('/stock/:stock')
  async getStock(@Param('stock') stock: string): Promise<Stock[]> {
    return this.getStockService.getStock(stock);
  }
}
