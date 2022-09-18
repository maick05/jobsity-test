import { CreateUserDTO } from './../../../../../../src/microservice/domain/model/dto/create-user.dto';
import { GeneratePasswordService } from './../../../../../../src/microservice/domain/service/auth/generate-password.service';
import {
  mockValidateUserService,
  mockGeneratePasswordService
} from './../../../../../mock/service/auth-service.mock';
import { ValidateUserService } from './../../../../../../src/microservice/domain/service/auth/validate-user.service';
import { RegisterUserService } from './../../../../../../src/microservice/domain/service/auth/register-user.service';
import { mockUserRepository } from '../../../../../mock/repository/repository.mock';
import { UsersMongooseRepository } from '../../../../../../src/microservice/adapter/repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { EnumUserRole } from '../../../../../../src/microservice/domain/enum/user-role.enum';

describe('RegisterUserService', () => {
  let sut: RegisterUserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterUserService],
      providers: [
        {
          provide: UsersMongooseRepository,
          useValue: mockUserRepository
        },
        {
          provide: ValidateUserService,
          useValue: mockValidateUserService
        },
        {
          provide: GeneratePasswordService,
          useValue: mockGeneratePasswordService
        }
      ]
    }).compile();

    sut = app.get<RegisterUserService>(RegisterUserService);
  });

  const mockUserDTO = () => {
    const user = new CreateUserDTO();
    user.email = 'any_email';
    user.role = EnumUserRole.ADMIN;
    return user;
  };

  describe('register', () => {
    it('Should call register and return a json response', async () => {
      const passStub = sinon
        .stub(mockGeneratePasswordService, 'generateUserPassword')
        .returns({
          password: 'any_password',
          hashPassword: 'any_hash'
        });

      const actual = await sut.register(mockUserDTO());

      expect(actual).to.be.deep.equal({
        email: 'any_email',
        password: 'any_password'
      });

      passStub.restore();
    });

    it('Should call register and throws an error for empty prop', async () => {
      try {
        const mockUser = new CreateUserDTO();
        mockUser.email = '';

        await sut.register(mockUser);
      } catch (err) {
        expect(err.message).to.be.deep.equal(
          `The property 'email' cannot be empty`
        );
      }
    });
  });
});
