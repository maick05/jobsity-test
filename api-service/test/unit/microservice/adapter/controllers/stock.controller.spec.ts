import { mockExpectedStats } from './../../../../mock/model/stat.mock';
import { mockConfigService } from './../../../../mock/service/config-service.mock';
import { JwtService } from '@nestjs/jwt';
import { mockHistoryStockArray } from './../../../../mock/model/history.mock';
import { mockStock } from './../../../../mock/model/stock.mock';
import { GetStatsService } from './../../../../../src/microservice/domain/service/stock/get-stats.service';
import {
  mockGetHistoryService,
  mockGetStatsService
} from './../../../../mock/service/stock-service.mock';
import { GetHistoryService } from './../../../../../src/microservice/domain/service/stock/get-history.service';
import { GetStockService } from './../../../../../src/microservice/domain/service/stock/get-stock.service';
import { StockController } from './../../../../../src/microservice/adapter/controller/stock.controller';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { mockGetStockService } from '../../../../mock/service/stock-service.mock';
import { mockJwtService } from '../../../../mock/service/auth-service.mock';
import { ConfigService } from '@nestjs/config';

describe('StockController', () => {
  let sut: StockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        {
          provide: GetStockService,
          useValue: mockGetStockService
        },
        {
          provide: GetHistoryService,
          useValue: mockGetHistoryService
        },
        {
          provide: GetStatsService,
          useValue: mockGetStatsService
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        },
        {
          provide: ConfigService,
          useValue: mockConfigService
        }
      ]
    }).compile();

    sut = app.get<StockController>(StockController);
  });

  describe('getStock', () => {
    it('Should call getStock and return a json response', async () => {
      const serviceStub = sinon
        .stub(mockGetStockService, 'getStock')
        .returns(mockStock());

      const actual = await sut.getStock('any_stock', 'any_email');

      expect(actual).to.be.deep.equal(mockStock());

      serviceStub.restore();
    });
  });

  describe('getHistoryStock', () => {
    it('Should call getHistoryStock and return a json response', async () => {
      const serviceStub = sinon
        .stub(mockGetHistoryService, 'getHistory')
        .returns(mockHistoryStockArray());

      const actual = await sut.getHistoryStock('any_email');

      expect(actual).to.be.deep.equal(mockHistoryStockArray());

      serviceStub.restore();
    });
  });

  describe('getStats', () => {
    it('Should call getStats and return a json response', async () => {
      const serviceStub = sinon
        .stub(mockGetStatsService, 'getStats')
        .returns(mockExpectedStats());

      const actual = await sut.getStats();

      expect(actual).to.be.deep.equal(mockExpectedStats());

      serviceStub.restore();
    });
  });
});
