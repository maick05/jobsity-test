import { StockHistoryMongooseRepository } from './../../../src/microservice/adapter/repository/stock-history.repository';
import {
  mockUserRepository,
  mockStockHistoryRepository
} from './../../mock/repository/repository.mock';
import { UsersMongooseRepository } from './../../../src/microservice/adapter/repository/user.repository';
import { CustomJwtAuthGuard } from './../../../src/core/auth/jwt/custom-jwt-auth.guard';
import { mockGuard } from './../../mock/guard/guard.mock';
import { LocalAuthGuard } from './../../../src/core/auth/local/local-auth.guard';
import { mockResetPasswordService } from './../../mock/service/security-service.mock';
import { ResetPasswordService } from './../../../src/microservice/domain/service/security/reset-password.service';
import { mockMailService } from './../../mock/service/mail-service.mock';
import { MailService } from './../../../src/microservice/domain/service/mail/mail.service';
import { GeneratePasswordService } from './../../../src/microservice/domain/service/auth/generate-password.service';
import { ValidateUserService } from './../../../src/microservice/domain/service/auth/validate-user.service';
import { RegisterUserService } from './../../../src/microservice/domain/service/auth/register-user.service';
import {
  mockGeneratePasswordService,
  mockLoginService,
  mockRegisterUserService,
  mockValidateUserService
} from './../../mock/service/auth-service.mock';
import { LoginService } from './../../../src/microservice/domain/service/auth/login.service';
import { GetStatsService } from './../../../src/microservice/domain/service/stock/get-stats.service';
import { LogHistoryService } from './../../../src/microservice/domain/service/stock/log-history.service';
import { GetHistoryService } from './../../../src/microservice/domain/service/stock/get-history.service';
import {
  mockGetStockService,
  mockGetHistoryService,
  mockLogHistoryService,
  mockGetStatsService
} from './../../mock/service/stock-service.mock';
import { GetStockService } from './../../../src/microservice/domain/service/stock/get-stock.service';
import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from '../../../src/microservice/adapter/controller/stock.controller';
import { Stock } from '../../../src/microservice/domain/model/stock.model';

import * as sinon from 'sinon';
import { expect } from 'chai';
import { AppModule } from './../../../src/microservice/app.module';

jest.setTimeout(10000);

describe('AppModule', () => {
  let stockController: StockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
      providers: []
    })
      .overrideProvider(GetStockService)
      .useValue(mockGetStockService)
      .overrideProvider(GetHistoryService)
      .useValue(mockGetHistoryService)
      .overrideProvider(LogHistoryService)
      .useValue(mockLogHistoryService)
      .overrideProvider(GetStatsService)
      .useValue(mockGetStatsService)
      .overrideProvider(LoginService)
      .useValue(mockLoginService)
      .overrideProvider(RegisterUserService)
      .useValue(mockRegisterUserService)
      .overrideProvider(ValidateUserService)
      .useValue(mockValidateUserService)
      .overrideProvider(GeneratePasswordService)
      .useValue(mockGeneratePasswordService)
      .overrideProvider(MailService)
      .useValue(mockMailService)
      .overrideProvider(ResetPasswordService)
      .useValue(mockResetPasswordService)
      .overrideProvider(UsersMongooseRepository)
      .useValue(mockUserRepository)
      .overrideProvider(StockHistoryMongooseRepository)
      .useValue(mockStockHistoryRepository)
      .overrideGuard(LocalAuthGuard)
      .useValue(mockGuard)
      .overrideGuard(CustomJwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    stockController = app.get<StockController>(StockController);
  });

  const mockStock = () => {
    const stock = new Stock();
    stock.name = 'any_name';
    stock.symbol = 'any_symbol';
    stock.date = 'any_date';
    stock.time = 'any_time';
    stock.open = 100;
    stock.close = 101;
    stock.high = 111;
    stock.low = 90;
    stock.volume = 190;
    return [stock];
  };

  describe('StockController', () => {
    it('should call getStock return an array', async () => {
      const getStockStub = sinon
        .stub(mockGetStockService, 'getStock')
        .returns(mockStock());

      const actual = await stockController.getStock('any_stock', 'any_email');

      expect(actual).to.be.deep.equal(mockStock());

      getStockStub.restore();
    });
  });
});
