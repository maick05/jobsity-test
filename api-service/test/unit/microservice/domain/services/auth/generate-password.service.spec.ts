import { RandomHelper } from './../../../../../../src/microservice/adapter/helper/random.helper';
import { GeneratePasswordService } from './../../../../../../src/microservice/domain/service/auth/generate-password.service';
import { mockUserRepository } from '../../../../../mock/repository/repository.mock';
import { UsersMongooseRepository } from '../../../../../../src/microservice/adapter/repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as bcrypt from 'bcryptjs';

describe('GeneratePasswordService', () => {
  let sut: GeneratePasswordService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GeneratePasswordService],
      providers: [
        {
          provide: UsersMongooseRepository,
          useValue: mockUserRepository
        }
      ]
    }).compile();

    sut = app.get<GeneratePasswordService>(GeneratePasswordService);
  });

  describe('generateUserPassword', () => {
    it('Should call generateUserPassword and return the correctly passwords', async () => {
      const randomStub = sinon
        .stub(RandomHelper, 'GenerateHashString')
        .returns('any_random_pass');

      const bcryptStub = sinon
        .stub(bcrypt, 'hashSync')
        .returns('any_hash_pass');

      const actual = await sut.generateUserPassword();

      expect(actual).to.be.deep.equal({
        password: 'any_random_pass',
        hashPassword: 'any_hash_pass'
      });

      randomStub.restore();
      bcryptStub.restore();
    });
  });

  describe('resetPassword', () => {
    it('Should call resetPassword and return the correctly passwords', async () => {
      const randomStub = sinon
        .stub(RandomHelper, 'GenerateHashString')
        .returns('any_random_pass');

      const updateSpy = sinon.spy(mockUserRepository, 'updatePassword');

      const actual = await sut.resetPassword('any_email');

      sinon.assert.calledOnce(updateSpy);

      expect(actual).to.be.deep.equal('any_random_pass');

      randomStub.restore();
      updateSpy.restore();
    });
  });
});
