import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from '../src/microservice/adapter/controller/stock.controller';
import { GetStockService } from '../src/microservice/domain/service/get-stock.service';

describe('AppController', () => {
  let appController: StockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [GetStockService]
    }).compile();

    appController = app.get<StockController>(StockController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
