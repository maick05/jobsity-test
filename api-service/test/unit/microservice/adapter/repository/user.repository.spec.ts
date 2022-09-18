import { MongoDBException } from './../../../../../src/core/error-handling/exception/mongodb.exception';
import { mockUser } from './../../../../mock/model/user.mock';
import { UsersMongooseRepository } from './../../../../../src/microservice/adapter/repository/user.repository';
import { mockMongooseModel } from './../../../../mock/repository/mongoose-repository.mock';
import { User } from './../../../../../src/microservice/domain/schema/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { getModelToken } from '@nestjs/mongoose';

describe('UserMongooseRepository', () => {
  let sut: UsersMongooseRepository;

  const mockFind = () => {
    return {
      sort: jest.fn(() => {
        return {
          select: jest.fn(() => {
            return {
              lean: jest.fn(() => {
                return {
                  exec: jest.fn(() => mockUser())
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
              exec: jest.fn(() => mockUser())
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
        UsersMongooseRepository,
        {
          provide: getModelToken(User.name),
          useValue: mockMongooseModel
        }
      ]
    }).compile();

    sut = app.get<UsersMongooseRepository>(UsersMongooseRepository);
  });

  describe('findOne', () => {
    it('Should call find and return an User', async () => {
      const getStub = sinon
        .stub(mockMongooseModel, 'findOne')
        .returns(mockFind());

      const actual = await sut.findOne({ any: 'any' }, { _id: 1 }, { any: 1 });

      expect(actual).to.be.deep.equal(mockUser());

      getStub.restore();
    });

    it('Should call find and return an User with default params', async () => {
      const getStub = sinon
        .stub(mockMongooseModel, 'findOne')
        .returns(mockFind());

      const actual = await sut.findOne({ any: 'any' });

      expect(actual).to.be.deep.equal(mockUser());

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

      await sut.insertOne(mockUser(), 'any');

      sinon.assert.calledOnce(createStubMongo);
      sinon.assert.calledOnceWithExactly(createStubSpy, mockUser());

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
        await sut.insertOne(mockUser(), 'any');
      } catch (err) {
        expect(err.message).to.be.equal('Error creating any: any error');
      }

      createStubMongo.restore();
    });
  });

  describe('updatePassword', () => {
    it('Should call updatePassword and call updateOne correctly', async () => {
      const updateSpy = sinon.spy(mockMongooseModel, 'updateOne');

      await sut.updatePassword('any_email', 'any_pass');

      sinon.assert.calledOnceWithExactly(
        updateSpy,
        { email: 'any_email' },
        { $set: { password: 'any_pass' } }
      );
      updateSpy.restore();
    });
  });
});
