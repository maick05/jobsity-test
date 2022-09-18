import { mockStockExpected } from './../../../../mock/stock.mock';
import { mockConfig } from './../../../../mock/service.mock';
import { ConfigService } from '@nestjs/config';
import { GetStockService } from './../../../../../src/microservice/domain/service/get-stock.service';
import { mockHttpService } from '../../../../mock/service.mock';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { HttpService } from '@nestjs/axios';

describe('GetStockService', () => {
  let sut: GetStockService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        GetStockService,
        {
          provide: HttpService,
          useValue: mockHttpService
        },
        {
          provide: ConfigService,
          useValue: mockConfig
        }
      ]
    }).compile();

    sut = app.get<GetStockService>(GetStockService);
  });

  describe('getStock', () => {
    it('should call getStock return a stock response', async () => {
      const actual = await sut.getStock('any_stock');

      expect(actual).to.be.deep.equal(mockStockExpected());
    });

    it('should call getStock return an error with HttpException', async () => {
      const httpGetStub = sinon
        .stub(mockHttpService, 'get')
        .throws(new Error('any error'));
      try {
        await sut.getStock('any_stock');
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.deep.equal('any error');
        expect(err.name).to.be.deep.equal('HttpException');
      }

      httpGetStub.restore();
    });
  });
});
