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
  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso', type: CreateCustomerDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UsePipes(new ZodValidationPipe(createCustomerSchemaZod)) // Aplicar validação Zod
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log(`Recebendo dados para criar o cliente: ${JSON.stringify(createCustomerDto)}`);
    try {
      const result = await this.customerService.create(createCustomerDto);
      this.logger.log(`Cliente criado com sucesso: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao criar cliente: ${error.message}`);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes', type: [CreateCustomerDto] })
  async findAll(): Promise<CreateCustomerDto[]> {
    this.logger.log('Obtendo todos os clientes');
    try {
      const result = await this.customerService.findAll();
      this.logger.log(`Clientes obtidos com sucesso: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao obter clientes: ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Dados do cliente', type: CreateCustomerDto })
  async findOne(@Param('id') id: string): Promise<CreateCustomerDto> {
    this.logger.log(`Obtendo cliente pelo ID: ${id}`);
    try {
      const result = await this.customerService.findOne(id);
      this.logger.log(`Cliente obtido com sucesso: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao obter cliente com ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso', type: CreateCustomerDto })
  async update(@Param('id') id: string, @Body() createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log(`Atualizando cliente com ID ${id}`);
    try {
      const result = await this.customerService.update(id, createCustomerDto);
      this.logger.log(`Cliente atualizado com sucesso: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao atualizar cliente com ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso', type: CreateCustomerDto })
  async remove(@Param('id') id: string): Promise<CreateCustomerDto> {
    this.logger.log(`Removendo cliente com ID ${id}`);
    try {
      const result = await this.customerService.remove(id);
      this.logger.log(`Cliente removido com sucesso: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao remover cliente com ID ${id}: ${error.message}`);
      throw error;
    }
  }
}
