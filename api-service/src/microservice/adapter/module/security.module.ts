import { ConfirmResetPasswordService } from './../../domain/service/security/confirm-reset-password.service';
import { UsersModule } from './users.module';
import {
  SecurityToken,
  SecurityTokenSchema
} from './../../domain/schema/security-tokens.schema';
import { RequestResetPasswordService } from '../../domain/service/security/request-reset-password.service';
import { MailModule } from './mail.module';
import { Module } from '@nestjs/common';
import { SecurityController } from '../controller/security.controller';
import { SecurityTokenMongooseRepository } from '../repository/security-token.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MailModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: SecurityToken.name, schema: SecurityTokenSchema }
    ])
  ],
  controllers: [SecurityController],
  providers: [
    RequestResetPasswordService,
    SecurityTokenMongooseRepository,
    ConfirmResetPasswordService
  ],
  exports: []
})
export class SecurityModule {}
