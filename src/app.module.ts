import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './database.config';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    MongooseModule.forRoot(databaseConfig.uri, {
      maxPoolSize: databaseConfig.maxPoolSize,
    }),
    OrderModule,
    ProductModule,
    CustomerModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
