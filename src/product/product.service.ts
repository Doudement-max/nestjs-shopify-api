import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDto>
  ) {}

  async findAll(): Promise<ProductDto[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductDto> {
    const product = await this.productModel.findById(id);
if (!product) {
  throw new NotFoundException('Produto não encontrado');
}
return product;
  }

  async create(product: ProductDto): Promise<ProductDto> {
    product.variants.forEach(variant => {
      variant.sku = this.generateRandomSku();
    });
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  
    async update(id: string, updateProductDto: ProductDto): Promise<ProductDto> {
      const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
      if (!updatedProduct) {
        throw new NotFoundException('Produto não encontrado');
      }
      return updatedProduct as ProductDto;
    }
  

  async remove(id: string): Promise<ProductDto> {
   const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
   if (!deletedProduct) {
    throw new NotFoundException('Produto não encontrado');
   }
   return deletedProduct as ProductDto;
  }

  private generateRandomSku(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sku = '';
    for (let i = 0; i < 8; i++) {
      sku += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return sku;
  }
}
