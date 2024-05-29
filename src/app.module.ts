import { Module } from '@nestjs/common';  
import {ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './database.config';
@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri, {
      maxPoolSize: databaseConfig.maxPoolSize,
    })
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
