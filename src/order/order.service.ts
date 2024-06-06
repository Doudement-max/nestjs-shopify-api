import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orderModel } from './order.model';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import { ResponseOrderDto } from './dto/response.order.dto';
import { FulfillmentDto } from './dto/fulfillment.dto';
import { TransactionDto } from './dto/transaction.dto';
import { OrderCancelDto } from './dto/cancel.order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(orderModel.name) private readonly orderModel: Model<any>
  ) {}

  async findAll(): Promise<ResponseOrderDto[]> {
    const orders = await this.orderModel.find().exec();
    return orders.map(order => order as ResponseOrderDto);
  }

  async findOne(id: string): Promise<ResponseOrderDto> {
    const order = await this.orderModel.findById(id).exec();
    return order as ResponseOrderDto;
  }

  async create(order: CreateOrderDto): Promise<ResponseOrderDto> {
    const newOrder = new this.orderModel(order);
    const savedOrder = await newOrder.save();
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
