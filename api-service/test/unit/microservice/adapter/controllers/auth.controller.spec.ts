import { CreateUserDTO } from './../../../../../src/microservice/domain/model/dto/create-user.dto';
import {
  mockRegisterUserService,
  mockLoginService
} from './../../../../mock/service/auth-service.mock';
import { RegisterUserService } from './../../../../../src/microservice/domain/service/auth/register-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../../src/microservice/adapter/controller/auth.controller';
import { LoginService } from '../../../../../src/microservice/domain/service/auth/login.service';
import { EnumUserRole } from '../../../../../src/microservice/domain/enum/user-role.enum';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('AuthController', () => {
  let sut: AuthController;

  const mockUser = () => {
    const user = new CreateUserDTO();
    user.email = 'any_email';
    user.role = EnumUserRole.USER;
    return user;
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: RegisterUserService,
          useValue: mockRegisterUserService
        },
        {
          provide: LoginService,
          useValue: mockLoginService
        }
      ]
    }).compile();

    sut = app.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('Should call register and return a json response', async () => {
      const serviceStub = sinon
        .stub(mockRegisterUserService, 'register')
        .returns({
          email: 'any_email',
          password: 'any_password'
        });

      const actual = await sut.register(mockUser());

      expect(actual).to.be.deep.equal({
        email: 'any_email',
        password: 'any_password'
      });

      serviceStub.restore();
    });
  });

  describe('login', () => {
    it('Should call login and return a json response', async () => {
      const serviceStub = sinon.stub(mockLoginService, 'login').returns({
        token: 'any_token'
      });

      const actual = await sut.login({
        headers: {
          authorization: 'any_basic_auth'
        }
      });

      expect(actual).to.be.deep.equal({
        token: 'any_token'
      });

      serviceStub.restore();
    });
  });
});
