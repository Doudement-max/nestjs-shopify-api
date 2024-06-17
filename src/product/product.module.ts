import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema, VariantSchema, OptionSchema, ImageSchema } from './product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Variant', schema: VariantSchema },
      { name: 'Option', schema: OptionSchema },
      { name: 'Image', schema: ImageSchema }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
