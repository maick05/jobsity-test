import { mockConfigService } from './../../../../../mock/service/config-service.mock';
import { mockJwtService } from './../../../../../mock/service/auth-service.mock';
import { JwtService } from '@nestjs/jwt';
import { mockUser } from './../../../../../mock/model/user.mock';
import { LoginUserDTO } from './../../../../../../src/microservice/domain/model/dto/login-user.dto';
import { mockUserRepository } from './../../../../../mock/repository/repository.mock';
import { UsersMongooseRepository } from './../../../../../../src/microservice/adapter/repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from '../../../../../../src/microservice/domain/service/auth/login.service';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { ConfigService } from '@nestjs/config';

describe('LoginService', () => {
  let sut: LoginService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginService],
      providers: [
        {
          provide: UsersMongooseRepository,
          useValue: mockUserRepository
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

    sut = app.get<LoginService>(LoginService);
  });

  const mockUserLogin = () => {
    const user = new LoginUserDTO();
    user.email = 'any_email';
    user.password = 'any_password';
    return user;
  };

  describe('login', () => {
    it('Should call login and return a json response', async () => {
      const getStub = sinon
        .stub(mockUserRepository, 'findOne')
        .returns(mockUser());

      const jwtStub = sinon.stub(mockJwtService, 'sign').returns('any_token');

      const actual = await sut.login(mockUserLogin());

      expect(actual).to.be.deep.equal({
        token: 'any_token'
      });

      getStub.restore();
      jwtStub.restore();
    });
  });
});
