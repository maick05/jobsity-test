import { mockHistoryStockArray } from './../../../../../mock/model/history.mock';
import { mockStockHistoryRepository } from '../../../../../mock/repository/repository.mock';
import { StockHistoryMongooseRepository } from '../../../../../../src/microservice/adapter/repository/stock-history.repository';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { GetHistoryService } from '../../../../../../src/microservice/domain/service/stock/get-history.service';
import { expect } from 'chai';

describe('GetHistoryService', () => {
  let sut: GetHistoryService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        GetHistoryService,
        {
          provide: StockHistoryMongooseRepository,
          useValue: mockStockHistoryRepository
        }
      ]
    }).compile();

    sut = app.get<GetHistoryService>(GetHistoryService);
  });

  describe('getHistory', () => {
    it('Should call getHistory and return an array', async () => {
      const getStub = sinon
        .stub(mockStockHistoryRepository, 'find')
        .returns(mockHistoryStockArray());

      const actual = await sut.getHistory('any_email');

      expect(actual).to.be.deep.equal(mockHistoryStockArray());

      getStub.restore();
    });

    it('Should call getHistory with empty history and return an empty array', async () => {
      const getStub = sinon
        .stub(mockStockHistoryRepository, 'find')
        .returns([]);

      const actual = await sut.getHistory('any_email');

      expect(actual).to.be.deep.equal([]);

      getStub.restore();
    });
  });
});
