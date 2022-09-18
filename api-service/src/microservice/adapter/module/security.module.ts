import { UsersModule } from './users.module';
import { ResetPasswordService } from '../../domain/service/security/reset-password.service';
import { MailModule } from './mail.module';
import { Module } from '@nestjs/common';
import { SecurityController } from '../controller/security.controller';

@Module({
  imports: [MailModule, UsersModule],
  controllers: [SecurityController],
  providers: [ResetPasswordService],
  exports: []
})
export class SecurityModule {}
