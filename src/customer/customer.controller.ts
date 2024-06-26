import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes', type: [CustomerDto] })
  async findAll(): Promise<CustomerDto[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Dados do cliente', type: CustomerDto })
  async findOne(@Param('id') id: string): Promise<CustomerDto> {
    return this.customerService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso', type: CustomerDto })
  async create(@Body() customer: CustomerDto): Promise<CustomerDto> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso', type: CustomerDto })
  async update(@Param('id') id: string, @Body() customer: CustomerDto): Promise<CustomerDto> {
    return this.customerService.update(id, customer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso', type: CustomerDto })
  async remove(@Param('id') id: string): Promise<CustomerDto> {
    return this.customerService.remove(id);
  }
}