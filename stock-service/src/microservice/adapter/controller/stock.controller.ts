import { Stock } from '../../domain/model/stock.model';
import { Controller, Get, Param } from '@nestjs/common';
import { GetStockService } from '../../domain/service/get-stock.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('stock')
@Controller()
export class StockController {
  constructor(private readonly getStockService: GetStockService) {}

  @ApiOkResponse({
    description: 'Stock return responsed!',
    isArray: true,
    type: Stock
  })
  @ApiParam({
    name: 'stock',
    required: true,
    description: 'Stock Quote name',
    example: 'googl.us'
  })
  @Get('/stock/:stock')
  async getStock(@Param('stock') stock: string): Promise<Stock[]> {
    return this.getStockService.getStock(stock);
  }
}
