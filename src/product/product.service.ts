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
    const products = await this.productModel.find().exec();
    console.log(`Recovered Product: ${JSON.stringify(products)}`);
    return products;
  }

  async findOne(id: string): Promise<ProductDto> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      console.log(`Product with ID ${id} not found`);
      throw new NotFoundException('Product not found');
    }
    console.log(`Recovered product: ${JSON.stringify(product)}`);
    return product;
  }

  async create(product: ProductDto): Promise<ProductDto> {
    product.variants.forEach(variant => {
      variant.sku = this.generateRandomSku();
    });
    const newProduct = new this.productModel(product);
    const savedProduct = await newProduct.save();
    console.log(`Product Created: ${JSON.stringify(savedProduct)}`);
    return savedProduct;
  }

  async update(id: string, updateProductDto: ProductDto): Promise<ProductDto> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!updatedProduct) {
      console.log(`Product with ID ${id} not found`);
      throw new NotFoundException('Product not found');
    }
    console.log(`Updated Product: ${JSON.stringify(updatedProduct)}`);
    return updatedProduct;
  }

  async remove(id: string): Promise<ProductDto> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      console.log(`Product with ID ${id} not found`);
      throw new NotFoundException('Product not found');
    }
    console.log(`Product Removed: ${JSON.stringify(deletedProduct)}`);
    return deletedProduct;
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
