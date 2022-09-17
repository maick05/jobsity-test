import { UsersModule } from './users.module';
import {
  SecurityToken,
  SecurityTokenSchema
} from './../../domain/schema/security-tokens.schema';
import { ResetPasswordService } from './../../domain/service/security/reset-password.service';
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
  providers: [ResetPasswordService, SecurityTokenMongooseRepository],
  exports: []
})
export class SecurityModule {}
