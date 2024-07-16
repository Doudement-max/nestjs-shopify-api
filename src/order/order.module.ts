import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { orderModel, OrderSchema } from './order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from 'src/product/product.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: orderModel.name, schema: OrderSchema }]),  
    forwardRef(() => ProductModule), 
    forwardRef(() => CustomerModule),
  ],
  providers: [OrderService],
  controllers: [OrderController], 
  exports: [OrderService],
})
export class OrderModule {}
