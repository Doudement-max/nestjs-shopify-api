import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private readonly customerModel: Model<Customer>) {}

  async findAll(): Promise<CustomerDto[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<CustomerDto> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async create(createCustomerDto: CustomerDto): Promise<CustomerDto> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return newCustomer.save();
  }

  async update(id: string, updateCustomerDto: CustomerDto): Promise<CustomerDto> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found');
    }
    return updatedCustomer;
  }

  async remove(id: string): Promise<CustomerDto> {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!deletedCustomer) {
      throw new NotFoundException('Customer not found');
    }
    return deletedCustomer;
  }
}