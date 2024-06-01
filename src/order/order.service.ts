import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orderModel } from './order.model';
import { CreateOrderDto, UpdateOrderDto } from './dto/create.order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(orderModel.name) private readonly orderModel: Model<orderModel>
  ) {}

  async findAll(): Promise<orderModel[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<orderModel> {
    return this.orderModel.findById(id).exec();
  }

  async create(order: CreateOrderDto): Promise<orderModel> {
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }

  async update(id: string, order: UpdateOrderDto): Promise<orderModel> {
    return this.orderModel.findByIdAndUpdate(id, order, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<orderModel> {
    try {
      const newOrder = new this.orderModel(createOrderDto);
      await newOrder.save();
      return newOrder;
    } catch (error) {
      console.error('Erro ao criar a ordem:', error.message);
      throw new Error('Não foi possível criar a ordem.');
    }
  }
}
