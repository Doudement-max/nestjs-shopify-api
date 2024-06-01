import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './database.config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri, {
      maxPoolSize: databaseConfig.maxPoolSize,
    }),
    OrderModule,
  ],
})
export class AppModule {}
