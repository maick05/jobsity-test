import { User, UserSchema } from './../../domain/schemas/user.schema';
import { UsersService } from './../../domain/services/users.service';
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
  providers: [UsersService, UsersMongooseRepository],
  exports: []
})
export class UsersModule {}
