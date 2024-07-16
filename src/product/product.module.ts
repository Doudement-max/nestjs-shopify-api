import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema, VariantSchema, OptionSchema, ImageSchema } from './product.schema';
import { OrderModule } from 'src/order/order.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Variant', schema: VariantSchema },
      { name: 'Option', schema: OptionSchema },
      { name: 'Image', schema: ImageSchema }
    ]),
    forwardRef(() => OrderModule), 
    forwardRef(() => CustomerModule)
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
