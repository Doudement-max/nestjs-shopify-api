import { Injectable } from '@nestjs/common';
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
    return this.productModel.findById(id).exec();
  }

  async create(product: ProductDto): Promise<ProductDto> {
    product.variants.forEach(variant => {
      variant.sku = this.generateRandomSku();
    });
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async update(id: string, product: ProductDto): Promise<ProductDto> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
  }

  async remove(id: string): Promise<ProductDto> {
    return this.productModel.findByIdAndDelete(id).exec();
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
