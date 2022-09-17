import { ValidateUserService } from '../../domain/service/auth/validate-user.service';
import { RegisterUserService } from '../../domain/service/auth/register-user.service';
import { User, UserSchema } from '../../domain/schema/user.schema';
import { LoginService } from '../../domain/service/auth/login.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { AuthController } from '../controller/auth.controller';
import { ConfigurationModule } from './configuration.module';
import { UsersMongooseRepository } from '../repository/user.repository';
import { GeneratePasswordService } from '../../domain/service/auth/generate-password.service';

@Module({
  imports: [
    AuthModule,
    ConfigurationModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserService,
    LoginService,
    ValidateUserService,
    GeneratePasswordService,
    UsersMongooseRepository
  ],
  exports: [
    RegisterUserService,
    LoginService,
    ValidateUserService,
    GeneratePasswordService
  ]
})
export class UsersModule {}
