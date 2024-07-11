import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import { CustomerDto } from './dto/customer.dto';
import { ShopifyService } from './shopify.customer.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    private readonly shopifyService: ShopifyService
  ) {}

  async findAll(): Promise<CustomerDto[]> {
    const customers = await this.customerModel.find().exec();
    return customers.map(customer => this.toCustomerDto(customer));
  }

  async findOne(id: string): Promise<CustomerDto> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return this.toCustomerDto(customer);
  }

  async create(createCustomerDto: CustomerDto): Promise<CustomerDto> {
    const newCustomer = new this.customerModel(createCustomerDto);
    const savedCustomer = await newCustomer.save();

    const shopifyCustomerId = await this.shopifyService.createCustomer({
      first_name: createCustomerDto.firstName,
      last_name: createCustomerDto.lastName,
      email: createCustomerDto.email,
      phone: createCustomerDto.phone,
      tags: createCustomerDto.orders.join(','),
    });

    savedCustomer.shopifyId = shopifyCustomerId;
    await savedCustomer.save();

    return this.toCustomerDto(savedCustomer);
  }

  async update(id: string, updateCustomerDto: CustomerDto): Promise<CustomerDto> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found');
    }

    await this.shopifyService.updateCustomer(updatedCustomer.shopifyId, {
      first_name: updateCustomerDto.firstName,
      last_name: updateCustomerDto.lastName,
      email: updateCustomerDto.email,
      phone: updateCustomerDto.phone,
      tags: updateCustomerDto.orders.join(','),
    });

    return this.toCustomerDto(updatedCustomer);
  }

  async remove(id: string): Promise<CustomerDto> {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!deletedCustomer) {
      throw new NotFoundException('Customer not found');
    }

    await this.shopifyService.deleteCustomer(deletedCustomer.shopifyId);

    return this.toCustomerDto(deletedCustomer);
  }

  private toCustomerDto(customer: Customer): CustomerDto {
    return {
      customerId: customer.customerId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      orders: customer.orders,
      addresses: customer.addresses,
      shopifyId: customer.shopifyId,
    };
  }
}
