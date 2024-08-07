import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.schema'; // Import the Customer model
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { ShopifyService } from './shopify.customer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: Customer.schema }]), // Pass the Customer model's schema
    forwardRef(() => OrderModule),
    forwardRef(() => ProductModule),
    ConfigModule,
    HttpModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, ShopifyService],
  exports: [CustomerService]
})
export class CustomerModule {}