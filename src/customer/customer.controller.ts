import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, CustomerDto, validateCustomer } from './dto/customer.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CustomerModel } from './customer.model';


@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso', type: validateCustomer})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  //@UsePipes(new ZodValidationPipe(CustomerModel))
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os clientes pelo ID' })
  @ApiResponse({ status: 200, description: 'Lista de clientes', type: [validateCustomer] })
  async findAll(): Promise<CustomerDto[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Dados do cliente', type: validateCustomer})
  async findOne(@Param('id') id: string): Promise<CustomerDto> {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso', type: validateCustomer})
  async update(@Param('id') id: string, @Body() customerDto: CustomerDto): Promise<CustomerDto> {
    return this.customerService.update(id, customerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso', type: validateCustomer })
  async remove(@Param('id') id: string): Promise<CustomerDto> {
    return this.customerService.remove(id);
  }
}
