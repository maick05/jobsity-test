import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../../../src/microservice/adapter/controllers/users.controller';
import { LoginService } from '../../../../../src/microservice/domain/services/auth/login.service';

describe('AppController', () => {
  let appController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [LoginService]
    }).compile();

    appController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
