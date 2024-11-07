import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class ShopifyService {
  constructor(private readonly httpService: HttpService) { }

  // Method to create customer on Shopify
  async createCustomer(customerData: any): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.post('https://api.shopify.com/v1/customers', customerData)
      );
      return response.data.id;
    } catch (error) {
      throw new InternalServerErrorException('Error creating customer in Shopify', error.message);
    }
  }

  // Method to update customer in Shopify
  async updateCustomer(customerId: string, customerData: any): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.put(`https://api.shopify.com/v1/customers/${customerId}`, customerData)
      );
    } catch (error) {
      throw new InternalServerErrorException('Error updating customer in Shopify', error.message);
    }
  }

  // Method to delete customer on Shopify
  async deleteCustomer(customerId: string): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.delete(`https://api.shopify.com/v1/customers/${customerId}`)
      );
    } catch (error) {
      throw new InternalServerErrorException('Error deleting customer in Shopify', error.message);
    }
  }
}
