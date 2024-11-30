import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerModel, customerMongooseSchema } from './customer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: customerMongooseSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService], 
})
export class CustomerModule {}
