import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CustomerModel, ICustomer } from './customer.model';  
import { createCustomerSchemaZod, CreateCustomerDto } from './dto/customer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ZodError } from 'zod';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectModel(CustomerModel.name) private readonly customerModel: Model<ICustomer>
  ) {}

  // Função para lidar com erros de validação Zod
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
  async findAll(): Promise<ICustomer[]> {
    try {
      this.logger.log('Fetching all customers...');
      const customers = await this.customerModel.find().exec();
      this.logger.log(`Recovered customers: ${JSON.stringify(customers)}`);
      return customers;
    } catch (error) {
      this.logger.error(`Failed to fetch customers: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to retrieve customers');
    }
  }

  // Recuperar cliente por ID
  async findOne(id: string): Promise<ICustomer> {
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
      this.logger.error(`Failed to fetch customer with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to fetch customer');
    }
  }

  // Criar novo cliente
  async create(createCustomerDto: CreateCustomerDto): Promise<ICustomer> {
    this.logger.log('Validating customer data...');
    try {
      // Validação com Zod
      createCustomerSchemaZod.parse(createCustomerDto);
      this.logger.log('Customer data validated successfully!');
      
      // Verificação de duplicidade de email
      const existingCustomer = await this.customerModel.findOne({ email: createCustomerDto.email }).exec();
      if (existingCustomer) {
        throw new BadRequestException('Email already registered');
      }
  
      // Criação e salvamento do cliente no banco de dados
      const newCustomer = new this.customerModel(createCustomerDto);
      const savedCustomer = await newCustomer.save(); 
  
      this.logger.log(`Customer created with ID: ${savedCustomer._id}`);
      return savedCustomer;
    } catch (error) {
      this.handleZodError(error);
    }
  }

  // Atualizar cliente por ID
  async update(id: string, createCustomerDto: CreateCustomerDto): Promise<ICustomer> {
    this.logger.log(`Updating customer with ID: ${id}`);
    try {
      // Validação do DTO
      createCustomerSchemaZod.parse(createCustomerDto);
      this.logger.log('Customer data validated successfully!');
    } catch (error) {
      this.handleZodError(error);
    }

    try {
      const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, createCustomerDto, { new: true }).exec();
      if (!updatedCustomer) {
        this.logger.warn(`Customer with ID ${id} not found`);
        throw new NotFoundException('Customer not found');
      }

      this.logger.log(`Customer updated successfully: ${JSON.stringify(updatedCustomer)}`);
      return updatedCustomer;
    } catch (error) {
      this.logger.error(`Failed to update customer with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to update customer');
    }
  }

  // Remover cliente por ID
  async remove(id: string): Promise<ICustomer> {
    this.logger.log(`Removing customer with ID: ${id}`);
    try {
      const deletedCustomer = await this.customerModel.findByIdAndDelete(id).exec();
      if (!deletedCustomer) {
        this.logger.warn(`Customer with ID ${id} not found`);
        throw new NotFoundException('Customer not found');
      }

      this.logger.log(`Customer removed successfully: ${JSON.stringify(deletedCustomer)}`);
      return deletedCustomer;
    } catch (error) {
      this.logger.error(`Failed to remove customer with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to remove customer');
    }
  }
}
