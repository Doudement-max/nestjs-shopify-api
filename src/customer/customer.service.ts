import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CustomerModel } from './customer.model'; // Import the Mongoose model
import { validateCustomer } from './dto/customer.dto'; 
import { CreateCustomerDto } from './dto/customer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectModel(CustomerModel.name) private readonly customerModel: Model<CreateCustomerDto>,
  ) {}

  async findAll(): Promise<CreateCustomerDto[]> {
    try {
      this.logger.log('Searching all customers...');
      const customerModel = await this.customerModel.find().exec();
      this.logger.log(`Recovered customers: ${JSON.stringify(customerModel)}`);
      return customerModel;
    } catch (error) {
      this.logger.error(`Failed to fetch customers: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve customers');
    }
  }

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
      this.logger.error(`Failed to search for customer with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to search for customer with ID');
    }
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log('Validating customer data...');
    try {
      validateCustomer(createCustomerDto); 
      this.logger.log('Customer data successfully validated!');
      
      const newCustomer = new this.customerModel(createCustomerDto); 
      const savedCustomer = await newCustomer.save(); 

      savedCustomer.customerId = savedCustomer._id.toHexString(); 
      await savedCustomer.save(); 

      this.logger.log(`Customer created with ID: ${savedCustomer.customerId}`); 
      return savedCustomer; 
    } catch (error) {
      this.logger.error(`Validation error: ${error.message}`);
      throw new BadRequestException('Invalid customer data');
    }
  }

  async update(id: string, createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log(`Updating client with ID: ${id}`);
    try {
      validateCustomer(createCustomerDto);
      this.logger.log('Customer data successfully validated!');
    } catch (error) {
      this.logger.error(`Validation error: ${error.message}`);
      throw new BadRequestException('Invalid customer data');
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
      this.logger.error(`Failed to update client with ID${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to update client');
    }
  }

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
      this.logger.error(`Failed to remove customer with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to remove client');
    }
  }
}
