
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto,ResponseOrderDto,FulfillmentDto,TransactionDto,OrderCancelDto } from './dto/order.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all order' })
  @ApiResponse({ status: 200, description: 'Order list', type: [ResponseOrderDto] })
  async findAll(): Promise<ResponseOrderDto[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order data', type: ResponseOrderDto })
  async findOne(@Param('id') id: string): Promise<ResponseOrderDto> {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Request created successfully', type: ResponseOrderDto })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<ResponseOrderDto> {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({ status: 200, description: 'Request updated successfully', type: ResponseOrderDto })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<ResponseOrderDto> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an order by ID' })
  @ApiResponse({ status: 200, description: 'Request removed successfully', type: ResponseOrderDto })
  async remove(@Param('id') id: string): Promise<ResponseOrderDto> {
    return this.orderService.remove(id);
  }

  @Post(':id/transactions')
  @ApiOperation({ summary: 'Add a transaction to an order' })
  @ApiResponse({ status: 200, description: 'Transaction added successfully', type: ResponseOrderDto })
  async addTransaction(@Param('id') id: string, @Body() transaction: TransactionDto): Promise<ResponseOrderDto> {
    return this.orderService.addTransaction(id, transaction);
  }

  @Post(':id/fulfillments')
  @ApiOperation({ summary: 'Add a greeting to an order' })
  @ApiResponse({ status: 200, description: 'Greeting added successfully', type: ResponseOrderDto })
  async addFulfillment(@Param('id') id: string, @Body() fulfillment: FulfillmentDto): Promise<ResponseOrderDto> {
    return this.orderService.addFulfillment(id, fulfillment);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiResponse({ status: 200, description: 'Order cancelled successfully', type: ResponseOrderDto })
  async cancelOrder(@Param('id') id: string, @Body() cancelDetails: OrderCancelDto): Promise<ResponseOrderDto> {
    return this.orderService.cancelOrder(id, cancelDetails);
  }
}
