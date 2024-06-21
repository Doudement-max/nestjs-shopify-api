import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orderModel } from './order.model';
import { CreateOrderSchemaType } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import { ResponseOrderDto } from './dto/response.order.dto';
import { FulfillmentDto } from './dto/fulfillment.dto';
import { TransactionDto } from './dto/transaction.dto';
import { OrderCancelDto } from './dto/cancel.order.dto';
import { ProductService } from 'src/product/product.service';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(orderModel.name) private readonly orderModel: Model<any>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: 
    ProductService,
  ) {}

  async findAll(): Promise<ResponseOrderDto[]> {
    const orders = await this.orderModel.find().exec();
    return orders.map(order => order as ResponseOrderDto);
  }

  async findOne(id: string): Promise<ResponseOrderDto> {
    const order = await this.orderModel.findById(id).exec();
    return order as ResponseOrderDto;
  }

  async create(createOrderDto: CreateOrderSchemaType): Promise<ResponseOrderDto> {
    const newOrder = new this.orderModel(createOrderDto);
    const savedOrder = await newOrder.save(); 
    const { productId, quantity } = createOrderDto;
      const product = await this.productService.findOne(productId);
      if (!product) {
        throw new NotFoundException('Produto não encontrado');
      }
    return savedOrder as ResponseOrderDto;
  } 


  async update(id: string, order: UpdateOrderDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, order, { new: true }).exec();
    return updatedOrder as ResponseOrderDto;
  }

  async remove(id: string): Promise<ResponseOrderDto> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    return deletedOrder as ResponseOrderDto;
  }

  async addTransaction(orderId: string, transaction: TransactionDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, { $push: { transactions: transaction } }, { new: true }).exec();
    return updatedOrder as ResponseOrderDto;
  }

  async addFulfillment(orderId: string, fulfillment: FulfillmentDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, { $push: { fulfillments: fulfillment } }, { new: true }).exec();
    return updatedOrder as ResponseOrderDto;
  }

  async cancelOrder(id: string, cancelDetails: OrderCancelDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, { status: 'cancelled', cancelDetails }, { new: true }).exec();
    return updatedOrder as ResponseOrderDto;
  }
}
