import { mockStockHistoryRepository } from './../../../../../mock/repository/repository.mock';
import { StockHistoryMongooseRepository } from './../../../../../../src/microservice/adapter/repository/history.repository';
import { mockStock } from '../../../../../mock/model/stock.mock';
import { LogHistoryService } from '../../../../../../src/microservice/domain/service/stock/log-history.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';

describe('LogHistoryService', () => {
  let sut: LogHistoryService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        LogHistoryService,
        {
          provide: StockHistoryMongooseRepository,
          useValue: mockStockHistoryRepository
        }
      ]
    }).compile();

    sut = app.get<LogHistoryService>(LogHistoryService);
  });

  describe('logHistory', () => {
    it('Should call logHistory and call insertOne', async () => {
      const logSpy = sinon.spy(mockStockHistoryRepository, 'insertOne');

      await sut.logHistory(mockStock(), 'any_email');

      sinon.assert.calledOnce(logSpy);

      logSpy.restore();
    });
  });
});
