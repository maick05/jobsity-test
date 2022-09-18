import {
  mockMappedStock,
  mockStock,
  mockStockResponse
} from './../../../../../mock/model/stock.mock';
import { LogHistoryService } from './../../../../../../src/microservice/domain/service/stock/log-history.service';
import {
  mockHttpService,
  mockLogHistoryService
} from './../../../../../mock/service/stock-service.mock';
import { GetStockService } from './../../../../../../src/microservice/domain/service/stock/get-stock.service';
import { mockConfigService } from '../../../../../mock/service/config-service.mock';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('GetStockService', () => {
  let sut: GetStockService;

  const mockHttpClientService = mockHttpService({
    data: mockStockResponse()
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        GetStockService,
        {
          provide: LogHistoryService,
          useValue: mockLogHistoryService
        },
        {
          provide: HttpService,
          useValue: mockHttpClientService
        },
        {
          provide: ConfigService,
          useValue: mockConfigService
        }
      ]
    }).compile();

    sut = app.get<GetStockService>(GetStockService);
  });

  describe('getStock', () => {
    it('Should call getStock and return a Stock', async () => {
      const logSpy = sinon.spy(mockLogHistoryService, 'logHistory');

      const actual = await sut.getStock('any_stock', 'any_email');

      expect(actual).to.be.deep.equal(mockStock());

      sinon.assert.calledOnceWithExactly(
        logSpy,
        mockMappedStock(),
        'any_email'
      );

      logSpy.restore();
    });

    it('Should call getStock and throws an error for empty stock!', async () => {
      const logSpy = sinon.spy(mockLogHistoryService, 'logHistory');

      try {
        await sut.getStock('', 'any_email');
      } catch (err) {
        expect(err.message).to.be.deep.equal(
          `The property 'Stock Quote(q)' cannot be empty`
        );
      }

      sinon.assert.notCalled(logSpy);

      logSpy.restore();
    });

    it('Should call getStock and throws an error for null stock!', async () => {
      const logSpy = sinon.spy(mockLogHistoryService, 'logHistory');

      try {
        await sut.getStock(null, 'any_email');
      } catch (err) {
        expect(err.message).to.be.deep.equal(
          `The property 'Stock Quote(q)' cannot be empty`
        );
      }

      sinon.assert.notCalled(logSpy);

      logSpy.restore();
    });

    it('Should call getStock and throws an error for not found stock!', async () => {
      const getStockStub = sinon.stub(mockHttpClientService, 'get').returns(
        of({
          data: []
        })
      );

      const logSpy = sinon.spy(mockLogHistoryService, 'logHistory');

      try {
        await sut.getStock('any_stock', 'any_email');
      } catch (err) {
        expect(err.message).to.be.deep.equal(`Stock 'any_stock' not found`);
      }

      sinon.assert.notCalled(logSpy);

      getStockStub.restore();
      logSpy.restore();
    });
  });

  describe('get', () => {
    it('Should call get and throws an error', async () => {
      const getStockStub = sinon
        .stub(mockHttpClientService, 'get')
        .throws(new Error('any error'));

      try {
        await sut.get('any');
      } catch (err) {
        expect(err.message).to.be.deep.equal('any error');
      }

      getStockStub.restore();
    });
  });
});
