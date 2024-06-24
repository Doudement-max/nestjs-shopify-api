
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import { ResponseOrderDto } from './dto/response.order.dto';
import { FulfillmentDto } from './dto/fulfillment.dto';
import { TransactionDto } from './dto/transaction.dto';
import { OrderCancelDto } from './dto/cancel.order.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos', type: [ResponseOrderDto] })
  async findAll(): Promise<ResponseOrderDto[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um pedido pelo ID' })
  @ApiResponse({ status: 200, description: 'Dados do pedido', type: ResponseOrderDto })
  async findOne(@Param('id') id: string): Promise<ResponseOrderDto> {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso', type: ResponseOrderDto })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<ResponseOrderDto> {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um pedido pelo ID' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso', type: ResponseOrderDto })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<ResponseOrderDto> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um pedido pelo ID' })
  @ApiResponse({ status: 200, description: 'Pedido removido com sucesso', type: ResponseOrderDto })
  async remove(@Param('id') id: string): Promise<ResponseOrderDto> {
    return this.orderService.remove(id);
  }

  @Post(':id/transactions')
  @ApiOperation({ summary: 'Adicionar uma transação a um pedido' })
  @ApiResponse({ status: 200, description: 'Transação adicionada com sucesso', type: ResponseOrderDto })
  async addTransaction(@Param('id') id: string, @Body() transaction: TransactionDto): Promise<ResponseOrderDto> {
    return this.orderService.addTransaction(id, transaction);
  }

  @Post(':id/fulfillments')
  @ApiOperation({ summary: 'Adicionar um cumprimento a um pedido' })
  @ApiResponse({ status: 200, description: 'Cumprimento adicionado com sucesso', type: ResponseOrderDto })
  async addFulfillment(@Param('id') id: string, @Body() fulfillment: FulfillmentDto): Promise<ResponseOrderDto> {
    return this.orderService.addFulfillment(id, fulfillment);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancelar um pedido' })
  @ApiResponse({ status: 200, description: 'Pedido cancelado com sucesso', type: ResponseOrderDto })
  async cancelOrder(@Param('id') id: string, @Body() cancelDetails: OrderCancelDto): Promise<ResponseOrderDto> {
    return this.orderService.cancelOrder(id, cancelDetails);
  }
}
