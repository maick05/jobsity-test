import { EnumUserRole } from './../../../../../../src/microservice/domain/enum/user-role.enum';
import { ValidateUserService } from './../../../../../../src/microservice/domain/service/auth/validate-user.service';
import { mockUser } from '../../../../../mock/model/user.mock';
import { LoginUserDTO } from '../../../../../../src/microservice/domain/model/dto/login-user.dto';
import { mockUserRepository } from '../../../../../mock/repository/repository.mock';
import { UsersMongooseRepository } from '../../../../../../src/microservice/adapter/repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { CreateUserDTO } from '../../../../../../src/microservice/domain/model/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

describe('ValidateUserService', () => {
  let sut: ValidateUserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ValidateUserService],
      providers: [
        {
          provide: UsersMongooseRepository,
          useValue: mockUserRepository
        }
      ]
    }).compile();

    sut = app.get<ValidateUserService>(ValidateUserService);
  });

  const mockCreateUserDTO = () => {
    const user = new CreateUserDTO();
    user.email = 'any_email';
    user.role = EnumUserRole.ADMIN;
    return user;
  };

  const mockUserLogin = () => {
    const user = new LoginUserDTO();
    user.email = 'any_email';
    user.password = 'any_password';
    return user;
  };

  describe('validateUserAlreadyExistsDB', () => {
    it('Should call validateUserAlreadyExistsDB and call findOne correctly', async () => {
      const getStub = sinon.stub(mockUserRepository, 'findOne').returns(null);

      await sut.validateUserAlreadyExistsDB(mockCreateUserDTO());

      sinon.assert.calledOnceWithExactly(getStub, {
        email: 'any_email'
      });

      getStub.restore();
    });

    it('Should call validateUserAlreadyExistsDB and throws an error for user already exists', async () => {
      const getStub = sinon
        .stub(mockUserRepository, 'findOne')
        .returns(mockUser());

      try {
        await sut.validateUserAlreadyExistsDB(mockCreateUserDTO());
      } catch (err) {
        expect(err.message).to.be.equal(
          `User with email 'any_email' already exists!`
        );
      }

      getStub.restore();
    });
  });

  describe('validateUserByCredentials', () => {
    it('Should call validateUserByCredentials validate as okay and return an User', async () => {
      const getStub = sinon
        .stub(mockUserRepository, 'findOne')
        .returns(mockUser());

      const bcryptStub = sinon.stub(bcrypt, 'compareSync').returns(true);

      const actual = await sut.validateUserByCredentials(mockUserLogin());

      expect(actual).to.be.deep.equal(mockUser());

      getStub.restore();
      bcryptStub.restore();
    });

    it('Should call validateUserByCredentials validate as not okay and return an Error', async () => {
      const getStub = sinon
        .stub(mockUserRepository, 'findOne')
        .returns(mockUser());

      const bcryptStub = sinon.stub(bcrypt, 'compareSync').returns(false);

      try {
        await sut.validateUserByCredentials(mockUserLogin());
      } catch (err) {
        expect(err.message).to.be.deep.equal('Invalid Credentials!');
      }

      getStub.restore();
      bcryptStub.restore();
    });

    it('Should call validateUserByCredentials not found user and return an Error', async () => {
      const getStub = sinon.stub(mockUserRepository, 'findOne').returns(null);

      try {
        await sut.validateUserByCredentials(mockUserLogin());
      } catch (err) {
        expect(err.message).to.be.deep.equal('Invalid Credentials!');
      }

      getStub.restore();
    });
  });

  describe('validateIfUserExistsDB', () => {
    it('Should call validateIfUserExistsDB validate as okay and return an User', async () => {
      const getStub = sinon
        .stub(mockUserRepository, 'findOne')
        .returns(mockUser());

      const actual = await sut.validateIfUserExistsDB('any_email');

      expect(actual).to.be.deep.equal(mockUser());

      getStub.restore();
    });

    it('Should call validateIfUserExistsDB not found user and return an Error', async () => {
      const getStub = sinon.stub(mockUserRepository, 'findOne').returns(null);

      try {
        await sut.validateIfUserExistsDB('any_email');
      } catch (err) {
        expect(err.message).to.be.deep.equal(
          `User with email 'any_email' not found`
        );
      }

      getStub.restore();
    });
  });
});
