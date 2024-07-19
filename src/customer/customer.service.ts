import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerModel, validateCustomer } from './customer.schema';
import { CustomerDto } from './dto/customer.dto'; 
import { AddressDto } from './dto/address.dto';
import { ShopifyService } from './shopify.customer.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerModel.modelName) private readonly customerModel: Model<CustomerModel>,
    private readonly shopifyService: ShopifyService
  ) {}

  async findAll(): Promise<CustomerDto[]> {
    const customers = await this.customerModel.find().exec();
    console.log(`Customers retrieved: ${JSON.stringify(customers)}`);
    return customers.map(customer => this.toCustomerDto(customer));
  }

  async findOne(id: string): Promise<CustomerDto> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      console.log(`Customer with ID ${id} not found`);
      throw new NotFoundException('Customer not found');
    }
    console.log(`Customer retrieved: ${JSON.stringify(customer)}`);
    return this.toCustomerDto(customer);
  }

  async create(createCustomerDto: CustomerDto): Promise<CustomerDto> {
    try {
      validateCustomer(createCustomerDto); // Validando com Zod
    } catch (error) {
      console.error(`Validation error: ${error}`);
      throw new BadRequestException('Invalid customer data');
    }

    const newCustomer = new this.customerModel(createCustomerDto);
    const savedCustomer = await newCustomer.save();

    const shopifyCustomerId = await this.shopifyService.createCustomer({
      first_name: createCustomerDto.firstName,
      last_name: createCustomerDto.lastName,
      email: createCustomerDto.email,
      phone: createCustomerDto.phone,
      tags: createCustomerDto.order.join(','),
    });

    savedCustomer.shopifyId = shopifyCustomerId;
    await savedCustomer.save();

    console.log(`Customer created: ${JSON.stringify(savedCustomer)}`);
    return this.toCustomerDto(savedCustomer);
  }

  async update(id: string, updateCustomerDto: CustomerDto): Promise<CustomerDto> {
    try {
      validateCustomer(updateCustomerDto); // Validando com Zod
    } catch (error) {
      console.error(`Validation error: ${error}`);
      throw new BadRequestException('Invalid customer data');
    }

    const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
    if (!updatedCustomer) {
      console.log(`Customer with ID ${id} not found`);
      throw new NotFoundException('Customer not found');
    }

    await this.shopifyService.updateCustomer(updatedCustomer.shopifyId, {
      first_name: updateCustomerDto.firstName,
      last_name: updateCustomerDto.lastName,
      email: updateCustomerDto.email,
      phone: updateCustomerDto.phone,
      tags: updateCustomerDto.order.join(','),
    });

    console.log(`Customer updated: ${JSON.stringify(updatedCustomer)}`);
    return this.toCustomerDto(updatedCustomer);
  }

  async remove(id: string): Promise<CustomerDto> {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!deletedCustomer) {
      console.log(`Customer with ID ${id} not found`);
      throw new NotFoundException('Customer not found');
    }

    await this.shopifyService.deleteCustomer(deletedCustomer.shopifyId);

    console.log(`Customer removed: ${JSON.stringify(deletedCustomer)}`);
    return this.toCustomerDto(deletedCustomer);
  }

  private toCustomerDto(customer: CustomerModel): CustomerDto {
    return {
      customerId: customer.customerId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      order: customer.order,
      addresses: customer.addresses as unknown as AddressDto[], 
      shopifyId: customer.shopifyId,
    };
  }
}
