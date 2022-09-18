import { AppModule } from '../../../src/microservice/adapter/module/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from '../../../src/microservice/adapter/controller/stock.controller';
import { Stock } from '../../../src/microservice/domain/model/stock.model';
import { GetStockService } from '../../../src/microservice/domain/service/get-stock.service';
import { mockGetStock } from '../../mock/service.mock';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('AppModule', () => {
  let stockController: StockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
      providers: []
    })
      .overrideProvider(GetStockService)
      .useValue(mockGetStock)
      .compile();

    stockController = app.get<StockController>(StockController);
  });

  const mockStock = () => {
    const stock = new Stock();
    stock.name = 'any_name';
    stock.symbol = 'any_symbol';
    stock.date = 'any_date';
    stock.time = 'any_time';
    stock.open = 100;
    stock.close = 101;
    stock.high = 111;
    stock.low = 90;
    stock.volume = 190;
    return [stock];
  };

  describe('StockController', () => {
    it('should call getStock return an array', async () => {
      const getStockStub = sinon
        .stub(mockGetStock, 'getStock')
        .returns(mockStock());

      const actual = await stockController.getStock('any_stock');

      expect(actual).to.be.deep.equal(mockStock());

      getStockStub.restore();
    });
  });
});
