import { ValidateUserService } from './../../domain/services/auth/validate-user.service';
import { RegisterUserService } from './../../domain/services/auth/register-user.service';
import { User, UserSchema } from './../../domain/schemas/user.schema';
import { LoginService } from '../../domain/services/auth/login.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { AuthController } from '../controllers/auth.controller';
import { ConfigurationModule } from './configuration.module';
import { UsersMongooseRepository } from '../repository/user.repository';

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
    UsersMongooseRepository
  ],
  exports: [RegisterUserService, LoginService, ValidateUserService]
})
export class UsersModule {}
