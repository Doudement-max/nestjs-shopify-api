/*import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, Logger, BadRequestException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, createCustomerSchemaZod } from './dto/customer.dto'; // já estendido de Zod DTO
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name); 

  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully', type: CreateCustomerDto })
  @ApiResponse({ status: 400, description: 'Bad Request' }) 
  @UsePipes(new ZodValidationPipe(createCustomerSchemaZod)) // Aplicando o ZodValidationPipe
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log(`Creating customer: ${JSON.stringify(createCustomerDto)}`);
    try {
      const result = await this.customerService.create(createCustomerDto);
      this.logger.log(`Customer created successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating customer: ${error.message}`);
      throw new BadRequestException(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'List of all customers', type: [CreateCustomerDto] })
  async findAll(): Promise<CreateCustomerDto[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer data', type: CreateCustomerDto })
  async findOne(@Param('id') id: string): Promise<CreateCustomerDto> {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully', type: CreateCustomerDto })
  async update(@Param('id') id: string, @Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    return this.customerService.update(id, createCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer removed successfully', type: CreateCustomerDto })
  async remove(@Param('id') id: string): Promise<CreateCustomerDto> {
    return this.customerService.remove(id);
  }
}
*/ 

import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, Logger, BadRequestException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, createCustomerSchemaZod } from './dto/customer.dto';
import { CreateCustomerResponse } from './dto/customer.dto';// Importa o novo tipo
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name); 

  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully with token', type: CreateCustomerResponse })
  @ApiResponse({ status: 400, description: 'Bad Request' }) 
  @UsePipes(new ZodValidationPipe(createCustomerSchemaZod)) // Aplicando o ZodValidationPipe
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerResponse> {
    this.logger.log(`Creating customer: ${JSON.stringify(createCustomerDto)}`);

    // Verifica se o campo email está presente
    if (!createCustomerDto.email) {
      throw new BadRequestException('Email is required');
    }

    try {
      const result = await this.customerService.create(createCustomerDto);
      this.logger.log(`Customer created successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating customer: ${error.message}`);
      throw new BadRequestException(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'List of all customers', type: [CreateCustomerDto] })
  async findAll(): Promise<CreateCustomerDto[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer data', type: CreateCustomerDto })
  async findOne(@Param('id') id: string): Promise<CreateCustomerDto> {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully', type: CreateCustomerDto })
  async update(@Param('id') id: string, @Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    return this.customerService.update(id, createCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer removed successfully', type: CreateCustomerDto })
  async remove(@Param('id') id: string): Promise<CreateCustomerDto> {
    return this.customerService.remove(id);
  }
}
