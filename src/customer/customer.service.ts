import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CustomerModel } from './customer.model'; // Importar o modelo do Mongoose
import { createCustomerSchemaZod, CreateCustomerDto } from './dto/customer.dto'; // Tipos bem definidos
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ZodError } from 'zod';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectModel(CustomerModel.name) private readonly customerModel: Model<CreateCustomerDto>, // Tipagem do Mongoose Model
  ) {}

  // Função auxiliar para lidar com erros do Zod
  private handleZodError(error: unknown): void {
    if (error instanceof ZodError) {
      this.logger.error(`Validation error: ${JSON.stringify(error.errors)}`);
      throw new BadRequestException(error.errors.map(e => e.message).join(', '));
    } else {
      this.logger.error(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Operation failed');
    }
  }

  // Recuperar todos os clientes
  async findAll(): Promise<CreateCustomerDto[]> {
    try {
      this.logger.log('Searching all customers...');
      const customers = await this.customerModel.find().exec();
      this.logger.log(`Recovered customers: ${JSON.stringify(customers)}`);
      return customers;
    } catch (error) {
      this.logger.error(`Failed to fetch customers: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to retrieve customers');
    }
  }

  // Recuperar cliente por ID
  async findOne(id: string): Promise<CreateCustomerDto> {
    try {
      this.logger.log(`Fetching customer by ID: ${id}`);
      const customer = await this.customerModel.findById(id).exec();
      if (!customer) {
        this.logger.warn(`Customer with ID ${id} not found`);
        throw new NotFoundException('Customer not found');
      }
      this.logger.log(`Recovered customer: ${JSON.stringify(customer)}`);
      return customer;
    } catch (error) {
      this.logger.error(`Failed to search for customer with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to search for customer with ID');
    }
  }

  // Criar novo cliente
  async create(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log('Validating customer data...');
    try {
      // Validação Zod diretamente no DTO
      createCustomerSchemaZod.parse(createCustomerDto);
      this.logger.log('Customer data successfully validated!');
      
      // Verifica se o campo email está presente e é válido
      if (!createCustomerDto.email) {
        throw new BadRequestException('Email is required and must be valid');
      }
  
      // Criação e salvamento do cliente no banco
      const newCustomer = new this.customerModel(createCustomerDto);
      newCustomer.customerId = newCustomer._id.toHexString(); // Gerar customerId com base no _id do MongoDB
      const savedCustomer = await newCustomer.save(); 
  
      this.logger.log(`Customer created with ID: ${savedCustomer.customerId}`);
      return savedCustomer;
    } catch (error) {
      this.handleZodError(error); // Tratamento centralizado de erros
    }
  }
  

  // Atualizar cliente por ID
  async update(id: string, createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log(`Updating client with ID: ${id}`);
    try {
      // Validação Zod diretamente no DTO
      createCustomerSchemaZod.parse(createCustomerDto);
      this.logger.log('Customer data successfully validated!');
    } catch (error) {
      this.handleZodError(error);
    }

    try {
      const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, createCustomerDto, { new: true }).exec();
      if (!updatedCustomer) {
        this.logger.warn(`Customer with ID ${id} not found`);
        throw new NotFoundException('Customer not found');
      }

      this.logger.log(`Client updated successfully: ${JSON.stringify(updatedCustomer)}`);
      return updatedCustomer;
    } catch (error) {
      this.logger.error(`Failed to update client with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to update client');
    }
  }

  // Remover cliente por ID
  async remove(id: string): Promise<CreateCustomerDto> {
    this.logger.log(`Removing client with ID: ${id}`);
    try {
      const deletedCustomer = await this.customerModel.findByIdAndDelete(id).exec();
      if (!deletedCustomer) {
        this.logger.warn(`Customer with ID ${id} not found`);
        throw new NotFoundException('Customer not found');
      }

      this.logger.log(`Client removed successfully: ${JSON.stringify(deletedCustomer)}`);
      return deletedCustomer;
    } catch (error) {
      this.logger.error(`Failed to remove customer with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to remove client');
    }
  }
}
