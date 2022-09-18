import {
  mockAgregatedStats,
  mockDesornedStats
} from './../../../../mock/model/stat.mock';
import {
  mockHistoryStock,
  mockHistoryStockArray
} from './../../../../mock/model/history.mock';
import { StockHistory } from './../../../../../src/microservice/domain/schema/stock-history.schema';
import { StockHistoryMongooseRepository } from './../../../../../src/microservice/adapter/repository/stock-history.repository';
import { MongoDBException } from '../../../../../src/core/error-handling/exception/mongodb.exception';
import { mockMongooseModel } from '../../../../mock/repository/mongoose-repository.mock';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { getModelToken } from '@nestjs/mongoose';

describe('StockHistoryMongooseRepository', () => {
  let sut: StockHistoryMongooseRepository;

  const mockFind = () => {
    return {
      sort: jest.fn(() => {
        return {
          select: jest.fn(() => {
            return {
              lean: jest.fn(() => {
                return {
                  exec: jest.fn(() => mockHistoryStockArray())
                };
              })
            };
          })
        };
      }),
      select: jest.fn(() => {
        return {
          lean: jest.fn(() => {
            return {
              exec: jest.fn(() => mockHistoryStockArray())
            };
          })
        };
      })
    };
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        StockHistoryMongooseRepository,
        {
          provide: getModelToken(StockHistory.name),
          useValue: mockMongooseModel
        }
      ]
    }).compile();

    sut = app.get<StockHistoryMongooseRepository>(
      StockHistoryMongooseRepository
    );
  });

  describe('find', () => {
    it('Should call find and return a Stock History Array', async () => {
      const getStub = sinon.stub(mockMongooseModel, 'find').returns(mockFind());

      const actual = await sut.find({ any: 'any' }, { _id: 1 }, { any: 1 });

      expect(actual).to.be.deep.equal(mockHistoryStockArray());

      getStub.restore();
    });

    it('Should call find and return a Stock History Array with deafult params', async () => {
      const getStub = sinon.stub(mockMongooseModel, 'find').returns(mockFind());

      const actual = await sut.find({ any: 'any' });

      expect(actual).to.be.deep.equal(mockHistoryStockArray());

      getStub.restore();
    });
  });

  describe('insertOne', () => {
    it('should call insertOne and call model.create with the correct params', async () => {
      const createStubMongo = sinon
        .stub(mockMongooseModel, 'create')
        .yields(null, () => {
          return;
        });

      const createStubSpy = sinon.spy(sut, 'create');

      await sut.insertOne(mockHistoryStock(), 'any');

      sinon.assert.calledOnce(createStubMongo);
      sinon.assert.calledOnceWithExactly(createStubSpy, mockHistoryStock());

      createStubMongo.restore();
      createStubSpy.restore();
    });

    it('should call insertOne and call model.create and throws an error', async () => {
      const createStubMongo = sinon
        .stub(mockMongooseModel, 'create')
        .yields(new MongoDBException('any error'), () => {
          return;
        });

      try {
        await sut.insertOne(mockHistoryStock(), 'any');
      } catch (err) {
        expect(err.message).to.be.equal('Error creating any: any error');
      }

      createStubMongo.restore();
    });
  });

  describe('groupByStack', () => {
    it('Should call groupByStack and return a stats array', async () => {
      const groupStub = sinon
        .stub(mockMongooseModel, 'aggregate')
        .returns(mockAgregatedStats());

      const actual = await sut.groupByStack();

      expect(actual).to.be.deep.equal(mockDesornedStats());

      groupStub.restore();
    });
  });

  describe('groupBy', () => {
    it('Should call groupBy and return a stats array', async () => {
      const aggStub = sinon
        .stub(mockMongooseModel, 'aggregate')
        .returns(mockAgregatedStats());

      const actual = await sut.groupBy({ any: 1 }, { any: 1 });

      expect(actual).to.be.deep.equal(mockAgregatedStats());

      aggStub.restore();
    });

    it('Should call groupBy and return a stats array with empty match', async () => {
      const aggStub = sinon
        .stub(mockMongooseModel, 'aggregate')
        .returns(mockAgregatedStats());

      const actual = await sut.groupBy({ any: 1 });

      expect(actual).to.be.deep.equal(mockAgregatedStats());

      aggStub.restore();
    });
  });
});
