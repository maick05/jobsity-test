import { Stat } from './../../domain/model/stat.model';
import { GetStatsService } from './../../domain/service/stock/get-stats.service';
import { StockHistory } from './../../domain/schema/stock-history.schema';
import { GetUser } from './../../domain/decorator/get-user.decorator';
import { CustomJwtAuthGuard } from './../../../core/auth/jwt/custom-jwt-auth.guard';
import { EnumUserRole } from './../../domain/enum/user-role.enum';
import { Stock } from './../../domain/model/stock.model';
import { GetStockService } from '../../domain/service/stock/get-stock.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Role } from '../../domain/decorator/role.decorator';
import { GetHistoryService } from '../../domain/service/stock/get-history.service';

@Controller()
export class StockController {
  constructor(
    private readonly getStockService: GetStockService,
    private readonly getStockHistoryService: GetHistoryService,
    private readonly getStatsService: GetStatsService
  ) {}

  @Role(EnumUserRole.USER)
  @UseGuards(CustomJwtAuthGuard)
  @Get('/stock')
  async getStock(
    @Query('q') stock: string,
    @GetUser() userEmail
  ): Promise<Stock> {
    return this.getStockService.getStock(stock, userEmail);
  }

  @Role(EnumUserRole.USER)
  @UseGuards(CustomJwtAuthGuard)
  @Get('/history')
  async getHistoryStock(@GetUser() userEmail): Promise<StockHistory[]> {
    return this.getStockHistoryService.getHistory(userEmail);
  }

  @Role(EnumUserRole.ADMIN)
  @UseGuards(CustomJwtAuthGuard)
  @Get('/stats')
  async getStats(): Promise<any[]> {
    return this.getStatsService.getStats();
  }
}
