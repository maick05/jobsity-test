import { ConfigurationModule } from './configuration.module';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();

console.log('process.env.JWT_SECRET');
console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '102s'
        }
      })
    })
  ],
  controllers: [],
  providers: [JwtService],
  exports: [JwtService]
})
export class AuthModule {}
