import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CustomerModel } from './customer.model'; // Importa o modelo Mongoose
import { validateCustomer } from './customer.model'; // Importa a validação Zod
import { CustomerDto } from './dto/customer.dto';
import { ShopifyService } from './shopify.customer.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomerService {
  constructor(
    private readonly shopifyService: ShopifyService,
    // Injetando o modelo Mongoose
    @InjectModel('Customer') private readonly customerModel: Model<CustomerDto>,
  ) {}

  async findAll(): Promise<CustomerDto[]> {
    const customers = await this.customerModel.find().exec();
    console.log(`Customer retrieved: ${JSON.stringify(customers)}`);
    return customers;
  }

  async findOne(id: string): Promise<CustomerDto> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      console.log(`Customer with ID ${id} not found`);
      throw new NotFoundException('Customer not found');
    }
    console.log(`Customer retrieved: ${JSON.stringify(customer)}`);
    return customer;
  }

  async create(customerDto: CustomerDto): Promise<CustomerDto> {
    // Validação com Zod
    try {
      validateCustomer(customerDto); // Valida o DTO usando Zod
    } catch (error) {
      console.error(`Validation error: ${error}`);
      throw new BadRequestException('Invalid customer data');
    }

    const newCustomer = new this.customerModel(customerDto);
    const savedCustomer = await newCustomer.save();

    // Simulando a criação de um cliente no Shopify
    const shopifyCustomerId = await this.shopifyService.createCustomer({
      first_name: customerDto.firstName,
      last_name: customerDto.lastName,
      email: customerDto.email,
      phone: customerDto.phone,
      tags: customerDto.order?.join(','),
    });

    savedCustomer.shopifyId = shopifyCustomerId;
    await savedCustomer.save();

    console.log(`Customer created: ${JSON.stringify(savedCustomer)}`);
    return savedCustomer;
  }

  async update(id: string, customerDto: CustomerDto): Promise<CustomerDto> {
    // Validação com Zod
    try {
      validateCustomer(customerDto); // Valida o DTO usando Zod
    } catch (error) {
      console.error(`Validation error: ${error}`);
      throw new BadRequestException('Invalid customer data');
    }

    const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, customerDto, { new: true }).exec();
    if (!updatedCustomer) {
      console.log(`Customer with ID ${id} not found`);
      throw new NotFoundException('Customer not found');
    }

    await this.shopifyService.updateCustomer(updatedCustomer.shopifyId, {
      first_name: customerDto.firstName,
      last_name: customerDto.lastName,
      email: customerDto.email,
      phone: customerDto.phone,
      tags: customerDto.order?.join(','),
    });

    console.log(`Customer updated: ${JSON.stringify(updatedCustomer)}`);
    return updatedCustomer;
  }

  async remove(id: string): Promise<CustomerDto> {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!deletedCustomer) {
      throw new NotFoundException('Customer not found');
    }

    try {
      await this.shopifyService.deleteCustomer(deletedCustomer.shopifyId);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting customer in Shopify');
    }

    console.log(`Customer removed: ${JSON.stringify(deletedCustomer)}`);
    return deletedCustomer;
  }
}
