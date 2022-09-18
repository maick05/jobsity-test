import {
  mockDesornedStats,
  mockExpectedStats
} from './../../../../../mock/model/stat.mock';
import { GetStatsService } from './../../../../../../src/microservice/domain/service/stock/get-stats.service';
import { mockStockHistoryRepository } from '../../../../../mock/repository/repository.mock';
import { StockHistoryMongooseRepository } from '../../../../../../src/microservice/adapter/repository/history.repository';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('GetStatsService', () => {
  let sut: GetStatsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        GetStatsService,
        {
          provide: StockHistoryMongooseRepository,
          useValue: mockStockHistoryRepository
        }
      ]
    }).compile();

    sut = app.get<GetStatsService>(GetStatsService);
  });

  describe('getStats', () => {
    it('Should call getStats and return an array', async () => {
      const getStub = sinon
        .stub(mockStockHistoryRepository, 'groupByStack')
        .returns(mockDesornedStats());

      const actual = await sut.getStats();

      expect(actual).to.be.deep.equal(mockExpectedStats());

      getStub.restore();
    });

    it('Should call getStats with empty stats and return an empty array', async () => {
      const getStub = sinon
        .stub(mockStockHistoryRepository, 'groupByStack')
        .returns([]);

      const actual = await sut.getStats();

      expect(actual).to.be.deep.equal([]);

      getStub.restore();
    });
  });
});
