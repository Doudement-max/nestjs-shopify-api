import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ShopifyService {
  private shopifyBaseUrl: string;
  private shopifyApiKey: string;
  private shopifyPassword: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.shopifyBaseUrl = this.configService.get<string>('SHOPIFY_BASE_URL');
    this.shopifyApiKey = this.configService.get<string>('SHOPIFY_API_KEY');
    this.shopifyPassword = this.configService.get<string>('SHOPIFY_PASSWORD');
  }

  async createCustomer(data: any): Promise<string> {
    const response = await lastValueFrom(this.httpService.post(
      `${this.shopifyBaseUrl}/admin/api/2024-04/customers.json`,
      { customer: data },
      {
        auth: {
          username: this.shopifyApiKey,
          password: this.shopifyPassword,
        },
      }
    ));

    if (response.status !== 201) {
      throw new Error('Falha ao criar cliente no Shopify');
    }

    return response.data.customer.id;
  }

  async updateCustomer(shopifyId: string, data: any): Promise<void> {
    const response = await lastValueFrom(this.httpService.put(
      `${this.shopifyBaseUrl}/admin/api/2024-04/customers/${shopifyId}.json`,
      { customer: data },
      {
        auth: {
          username: this.shopifyApiKey,
          password: this.shopifyPassword,
        },
      }
    ));

    if (response.status !== 200) {
      throw new Error('Falha ao atualizar o cliente no Shopify');
    }
  }

  async deleteCustomer(shopifyId: string): Promise<void> {
    const response = await lastValueFrom(this.httpService.delete(
      `${this.shopifyBaseUrl}/admin/api/2024-04/customers/${shopifyId}.json`,
      {
        auth: {
          username: this.shopifyApiKey,
          password: this.shopifyPassword,
        },
      }
    ));

    if (response.status !== 200 && response.status !== 204) {
      throw new Error('Falha ao excluir cliente no Shopify');
    }
  }
}
