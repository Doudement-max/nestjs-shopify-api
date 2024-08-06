import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common'; 


@Injectable()
export class ShopifyService {
  constructor(private readonly httpService: HttpService) {}

  async createCustomer(customerData: any): Promise<string> {
    try {
      const response = await this.httpService.post('https://api.shopify.com/v1/customers', customerData).toPromise();
      return response.data.id;
    } catch (error) {
      throw new InternalServerErrorException('Error creating customer in Shopify');
    }
  }

  async updateCustomer(customerId: string, customerData: any): Promise<void> {
    try {
      await this.httpService.put(`https://api.shopify.com/v1/customers/${customerId}`, customerData).toPromise();
    } catch (error) {
      throw new InternalServerErrorException('Error updating customer in Shopify');
    }
  }

  async deleteCustomer(customerId: string): Promise<void> {
    try {
      await this.httpService.delete(`https://api.shopify.com/v1/customers/${customerId}`).toPromise();
    } catch (error) {
      throw new InternalServerErrorException('Error deleting customer in Shopify');
    }
  }
}
