// src/orders/orders.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import { ResponseOrderDto } from './dto/response.order.dto';
import { FulfillmentDto } from './dto/fulfillment.dto';
import { TransactionDto } from './dto/transaction.dto';
import { OrderCancelDto } from './dto/cancel.order.dto';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { createOrderSchema, CreateOrderSchemaType } from './dto/create.order.dto'; 

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<ResponseOrderDto[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseOrderDto> {
    return this.orderService.findOne(id);
  }

  @Post()
  async create(@Body(new ZodValidationPipe(createOrderSchema)) createOrderDto: CreateOrderSchemaType): Promise<ResponseOrderDto> {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<ResponseOrderDto> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.orderService.remove(id);
  }

  @Post(':id/transactions')
  async addTransaction(@Param('id') id: string, @Body() transaction: TransactionDto): Promise<ResponseOrderDto> {
    return this.orderService.addTransaction(id, transaction);
  }

  @Post(':id/fulfillments')
  async addFulfillment(@Param('id') id: string, @Body() fulfillment: FulfillmentDto): Promise<ResponseOrderDto> {
    return this.orderService.addFulfillment(id, fulfillment);
  } 
}
