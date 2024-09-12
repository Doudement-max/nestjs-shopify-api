import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, Logger } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, createCustomerSchemaZod } from './dto/customer.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name); // Instância do Logger
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Client created successfully', type: CreateCustomerDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UsePipes(new ZodValidationPipe(createCustomerSchemaZod)) // Aplicar validação Zod
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log(`Receiving data to create the client: ${JSON.stringify(createCustomerDto)}`);
    try {
      const result = await this.customerService.create(createCustomerDto);
      this.logger.log(`Client created successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating client: ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'Customer list', type: [CreateCustomerDto] })
  async findAll(): Promise<CreateCustomerDto[]> {
    this.logger.log('Get all customers');
    try {
      const result = await this.customerService.findAll();
      this.logger.log(`Successfully Obtained Clients: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error getting customers: ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer data', type: CreateCustomerDto })
  async findOne(@Param('id') id: string): Promise<CreateCustomerDto> {
    this.logger.log(`Getting customer by ID: ${id}`);
    try {
      const result = await this.customerService.findOne(id);
      this.logger.log(`Client successfully obtained: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error getting customer ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({ status: 200, description: 'Client updated successfully', type: CreateCustomerDto })
  async update(@Param('id') id: string, @Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log(`Updating client with ID ${id}`);
    try {
      const result = await this.customerService.update(id, createCustomerDto);
      this.logger.log(`Client updated successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error updating client with ID${id}: ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a customer by ID' })
  @ApiResponse({ status: 200, description: 'Client removed successfully', type: CreateCustomerDto })
  async remove(@Param('id') id: string): Promise<CreateCustomerDto> {
    this.logger.log(`Removing client with ID ${id}`);
    try {
      const result = await this.customerService.remove(id);
      this.logger.log(`Client removed successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error removing customer with ID${id}: ${error.message}`);
      throw error;
    }
  }
}
