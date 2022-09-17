import * as dotenv from 'dotenv';

dotenv.config();

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './adapter/module/users.module';
import { ConfigurationModule } from './adapter/module/configuration.module';
import { StockModule } from './adapter/module/stock.module';

@Module({
  imports: [
    ConfigurationModule,
    UsersModule,
    StockModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.mongodb.connection')
      })
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
