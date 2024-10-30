import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { databaseConfig } from './database.config';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { AuthMiddleware } from './middleware/auth.middleware';

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
    // Configuração do módulo JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Chave secreta do JWT
        signOptions: { expiresIn: '1h' }, // Tempo de expiração do token
      }),
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
