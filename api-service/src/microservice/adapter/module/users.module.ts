import { RegisterUserService } from './../../domain/services/auth/register-user.service';
import { User, UserSchema } from './../../domain/schemas/user.schema';
import { LoginService } from '../../domain/services/auth/login.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { UsersController } from '../controllers/users.controller';
import { ConfigurationModule } from './configuration.module';
import { UsersMongooseRepository } from '../repository/user.repository';

@Module({
  imports: [
    AuthModule,
    ConfigurationModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [RegisterUserService, LoginService, UsersMongooseRepository],
  exports: [RegisterUserService, LoginService]
})
export class UsersModule {}
