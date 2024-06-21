import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { orderModel, OrderSchema } from './order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: orderModel.name, schema: OrderSchema }]), ProductModule
  ],
  providers: [OrderService],
  controllers: [OrderController], 
  exports: [OrderService],
})
export class OrderModule {}
