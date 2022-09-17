import { ConfigurationModule } from './configuration.module';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: await configService.get('auth.jwt.secret')
      })
    })
  ],
  controllers: [],
  providers: [JwtService],
  exports: [JwtService]
})
export class AuthModule {}
