import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, createCustomerSchemaZod, CreateCustomerResponse } from './dto/customer.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { ICustomer } from './customer.model';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @Post('create/:firstName/:lastName/:email')
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully', type: CreateCustomerResponse })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UsePipes(new ZodValidationPipe(createCustomerSchemaZod))
  async create(
    @Param('firstName') firstName: string,
    @Param('lastName') lastName: string,
    @Param('email') email: string,
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<CreateCustomerResponse> {
    this.logger.log(`Creating customer with email: ${email}`);
    
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    try {
      const completeCustomerDto = { ...createCustomerDto, firstName, lastName, email }; // Mescla os parâmetros ao DTO
      const customer = await this.customerService.create(completeCustomerDto);
      const token = "dummy_token";  // Gere o token aqui se necessário
      return { customer, token };
    } catch (error) {
      this.logger.error(`Error creating customer: ${error.message}`);
      throw new BadRequestException(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'List of all customers', type: [CreateCustomerDto] })
  async findAll(): Promise<ICustomer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer data', type: CreateCustomerDto })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async findOne(@Param('id') id: string): Promise<ICustomer> {
    const customer = await this.customerService.findOne(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully', type: CreateCustomerDto })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: CreateCustomerDto): Promise<ICustomer> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer removed successfully', type: CreateCustomerDto })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async remove(@Param('id') id: string): Promise<ICustomer> {
    return this.customerService.remove(id);
  }
}
