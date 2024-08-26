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
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(orderModel.name) private readonly orderModel: Model<any>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
    @Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService,
  ) {}

  async findAll(): Promise<ResponseOrderDto[]> {
    const order = await this.orderModel.find().exec();
    console.log(`Pedido Recuperado: ${JSON.stringify(order)}`);
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

  async findOrderByCustomerId(customerId: string): Promise<ResponseOrderDto[]> {
    const order = await this.orderModel.find({ customerId }).exec();
    console.log(`Pedido para Cliente ID ${customerId} recuperada: ${JSON.stringify(order)}`);
    return order.map(order => order as ResponseOrderDto);
  }

  async create(createOrderDto: CreateOrderSchemaType): Promise<ResponseOrderDto> {
    const { productId, customerId, quantity } = createOrderDto;

    const product = await this.productService.findOne(productId);
    if (!product) {
      console.log(`Product with ID ${productId} not found`);
      throw new NotFoundException('Produto não encontrado');
    }

    const customer = await this.customerService.findOne(customerId);
    if (!customer) {
      console.log(`Customer with ID ${customerId} not found`);
      throw new NotFoundException('Cliente não encontrado');
    }

    const newOrder = new this.orderModel(createOrderDto);
    const savedOrder = await newOrder.save();

    customer.order.push(savedOrder._id.toString());
    await this.customerService.update(customerId, {
      order: customer.order,
      customerId: customer.customerId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      addresses: customer.addresses || [],
    });

    console.log(`Order created: ${JSON.stringify(savedOrder)}`);
    return savedOrder as ResponseOrderDto;
  }

  async update(id: string, order: UpdateOrderDto): Promise<ResponseOrderDto> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, order, { new: true }).exec();
    if (!updatedOrder) {
      console.log(`Order with ID ${id} not found`);
      throw new NotFoundException('Pedido não encontrado');
    }
    console.log(`Order updated: ${JSON.stringify(updatedOrder)}`);
    return updatedOrder as ResponseOrderDto;
  }

  async remove(id: string): Promise<ResponseOrderDto> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      console.log(`Order with ID ${id} not found`);
      throw new NotFoundException('Pedido não encontrado');
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
      throw new NotFoundException('Pedido não encontrado');
    }
    console.log(`Order ID ${id} cancelled: ${JSON.stringify(cancelDetails)}`);
    return updatedOrder as ResponseOrderDto;
  }
}