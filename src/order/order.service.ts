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
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
  ) {}

  async findAll(): Promise<ResponseOrderDto[]> {
    const order = await this.orderModel.find().exec();
    console.log(`Request Recovered: ${JSON.stringify(order)}`);
    return order.map(order => order as ResponseOrderDto);
  }

  async findOne(id: string): Promise<ResponseOrderDto> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      console.log(`Order with ID ${id} not found`);
      throw new NotFoundException('Order not found');
    }
    console.log(`Order retrieved: ${JSON.stringify(order)}`);
    return order as ResponseOrderDto;
  }

  // Removendo o método findOrderByCustomerId porque depende do CustomerService

  async create(createOrderDto: CreateOrderSchemaType): Promise<ResponseOrderDto> {
    const { productId, quantity } = createOrderDto;

    // Validando o produto
    const product = await this.productService.findOne(productId);
    if (!product) {
      console.log(`Product with ID ${productId} not found`);
      throw new NotFoundException('Product not found');
    }

    // Criando o pedido
    const newOrder = new this.orderModel(createOrderDto);
    const savedOrder = await newOrder.save();

    console.log(`Order created: ${JSON.stringify(savedOrder)}`);
    return savedOrder as ResponseOrderDto;
  }

  async update(id: string, order: UpdateOrderDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, order, { new: true }).exec();
    if (!updatedOrder) {
      console.log(`Order with ID ${id} not found`);
      throw new NotFoundException('Request not found');
    }
    console.log(`Order updated: ${JSON.stringify(updatedOrder)}`);
    return updatedOrder as ResponseOrderDto;
  }

  async remove(id: string): Promise<ResponseOrderDto> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      console.log(`Order with ID ${id} not found`);
      throw new NotFoundException('Request not found');
    }
    console.log(`Order removed: ${JSON.stringify(deletedOrder)}`);
    return deletedOrder as ResponseOrderDto;
  }

  async addTransaction(orderId: string, transaction: TransactionDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, { $push: { transactions: transaction } }, { new: true }).exec();
    console.log(`Transaction added to order ID ${orderId}: ${JSON.stringify(transaction)}`);
    return updatedOrder as ResponseOrderDto;
  }

  async addFulfillment(orderId: string, fulfillment: FulfillmentDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, { $push: { fulfillments: fulfillment } }, { new: true }).exec();
    console.log(`Fulfillment added to order ID ${orderId}: ${JSON.stringify(fulfillment)}`);
    return updatedOrder as ResponseOrderDto;
  }

  async cancelOrder(id: string, cancelDetails: OrderCancelDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, { status: 'cancelled', cancelDetails }, { new: true }).exec();
    if (!updatedOrder) {
      console.log(`Order with ID ${id} not found`);
      throw new NotFoundException('Request not found');
    }
    console.log(`Order ID ${id} cancelled: ${JSON.stringify(cancelDetails)}`);
    return updatedOrder as ResponseOrderDto;
  }
}
