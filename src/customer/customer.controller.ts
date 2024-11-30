import { Controller, Post, Get, Query, Param, Body, Logger, BadRequestException, UsePipes } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, CreateCustomerResponse, createCustomerSchemaZod } from './dto/customer.dto'; // Importa o DTO
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully', type: CreateCustomerResponse })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UsePipes(new ZodValidationPipe(createCustomerSchemaZod)) // Aplicando o ZodValidationPipe com o esquema
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerResponse> {
    this.logger.log(`Creating customer with email: ${createCustomerDto.email}`);
    
    try {
      const customer = await this.customerService.create(createCustomerDto);
      const token = 'dummy_token'; // Gere o token conforme necessário
      return { customer, token };
    } catch (error) {
      this.logger.error(`Error creating customer: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Post(':id/activation-url')
  @ApiOperation({ summary: 'Create an account activation URL for a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Activation URL created successfully' })
  async createActivationUrl(@Param('id') id: string): Promise<{ account_activation_url: string }> {
    this.logger.log(`Creating account activation URL for customer with ID: ${id}`);
    try {
      const { account_activation_url } = await this.customerService.createAccountActivationUrl(id);
      return { account_activation_url };
    } catch (error) {
      this.logger.error(`Error creating activation URL: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Post(':id/send-invite')
  @ApiOperation({ summary: 'Send an account invite to a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 201, description: 'Account invite sent successfully' })
  async sendInvite(
    @Param('id') id: string,
    @Body() inviteData: {
      to: string;
      from: string;
      bcc: string[];
      subject: string;
      custom_message: string;
    }
  ): Promise<{ customer_invite: any }> {
    this.logger.log(`Sending account invite to customer with ID: ${id}`);
    try {
      const { customer_invite } = await this.customerService.sendAccountInvite(id, inviteData);
      return { customer_invite };
    } catch (error) {
      this.logger.error(`Error sending account invite: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of customers' })
  @ApiResponse({ status: 200, description: 'List of customers retrieved successfully' })
  @ApiQuery({ name: 'api_version', required: true, description: 'API version' })
  @ApiQuery({ name: 'created_at_max', required: false, description: 'Show customers created before a specified date', example: '2014-04-25T16:15:47-04:00' })
  @ApiQuery({ name: 'created_at_min', required: false, description: 'Show customers created after a specified date', example: '2014-04-25T16:15:47-04:00' })
  @ApiQuery({ name: 'fields', required: false, description: 'Show only certain fields, specified by a comma-separated list of field names' })
  @ApiQuery({ name: 'ids', required: false, description: 'Restrict results to customers specified by a comma-separated list of IDs' })
  @ApiQuery({ name: 'limit', required: false, description: 'The maximum number of results to show', example: 50, schema: { type: 'integer', maximum: 250, default: 50 } })
  @ApiQuery({ name: 'since_id', required: false, description: 'Restrict results to those after the specified ID' })
  @ApiQuery({ name: 'updated_at_max', required: false, description: 'Show customers last updated before a specified date', example: '2014-04-25T16:15:47-04:00' })
  @ApiQuery({ name: 'updated_at_min', required: false, description: 'Show customers last updated after a specified date', example: '2014-04-25T16:15:47-04:00' })
  async getCustomers(
    @Query('api_version') apiVersion: string,
    @Query('created_at_max') createdAtMax?: string,
    @Query('created_at_min') createdAtMin?: string,
    @Query('fields') fields?: string,
    @Query('ids') ids?: string,
    @Query('limit') limit?: number,
    @Query('since_id') sinceId?: string,
    @Query('updated_at_max') updatedAtMax?: string,
    @Query('updated_at_min') updatedAtMin?: string
  ): Promise<{ customers: any[] }> {
    this.logger.log('Retrieving list of customers');
    try {
      const customers = await this.customerService.getCustomers({
        apiVersion,
        createdAtMax,
        createdAtMin,
        fields,
        ids,
        limit,
        sinceId,
        updatedAtMax,
        updatedAtMin
      });
      return { customers };
    } catch (error) {
      this.logger.error(`Error retrieving customers: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiQuery({ name: 'fields', required: false, description: 'Show only certain fields, specified by a comma-separated list of field names' })
  @ApiResponse({ status: 200, description: 'Customer retrieved successfully' })
  async getCustomer(
    @Param('id') id: string,
    @Query('fields') fields?: string
  ): Promise<{ customer: any }> {
    this.logger.log(`Retrieving customer with ID: ${id}`);
    try {
      const customer = await this.customerService.getCustomer(id, fields);
      return { customer };
    } catch (error) {
      this.logger.error(`Error retrieving customer: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
