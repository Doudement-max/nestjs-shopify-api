/*import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { customerMongooseSchema } from './customer.model';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { ShopifyService } from './shopify.customer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CustomerModel.name', schema: customerMongooseSchema }]), 
    forwardRef(() => OrderModule),
    forwardRef(() => ProductModule),
    ConfigModule,
    HttpModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, ShopifyService],
  exports: [CustomerService]
})
export class CustomerModule {}*/ 

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerModel, customerMongooseSchema } from './customer.model';

@Module({
  imports: [
    
    MongooseModule.forFeature([{ name: CustomerModel.name, schema: customerMongooseSchema }])
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService], 
})
export class CustomerModule {}
