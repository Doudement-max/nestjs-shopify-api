import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './database.config';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri, {
      maxPoolSize: databaseConfig.maxPoolSize,
    }),
    OrderModule, ProductModule
  ],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer 
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
