import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../../src/microservice/adapter/controllers/auth.controller';
import { LoginService } from '../../../../../src/microservice/domain/services/auth/login.service';

describe('AppController', () => {
  let appController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [LoginService]
    }).compile();

    appController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
