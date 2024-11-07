import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ShopifyService {
  private readonly shopifyUrl: string;
  private readonly accessToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Obtemos a URL base e o token de acesso a partir das variáveis de ambiente
    this.shopifyUrl = `${this.configService.get<string>('SHOPIFY_STORE_URL')}/admin/api/${this.configService.get<string>('SHOPIFY_API_VERSION')}/customers`;
    this.accessToken = this.configService.get<string>('SHOPIFY_ACCESS_TOKEN');
  }

  // Função para obter os cabeçalhos de autenticação
  private getHeaders() {
    return {
      headers: {
        'X-Shopify-Access-Token': this.accessToken,
        'Content-Type': 'application/json',
      },
    };
  }

  // Método para criar um cliente na Shopify
  async createCustomer(customerData: any): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(this.shopifyUrl, customerData, this.getHeaders())
      );
      return response.data.customer.id;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new BadRequestException('Invalid data provided for customer creation in Shopify');
      } else if (error.response?.status === 401) {
        throw new UnauthorizedException('Authentication failed for Shopify');
      }
      throw new InternalServerErrorException('Error creating customer on Shopify');
    }
  }

  // Método para atualizar um cliente na Shopify
  async updateCustomer(customerId: string, customerData: any): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.put(`${this.shopifyUrl}/${customerId}.json`, customerData, this.getHeaders())
      );
    } catch (error) {
      if (error.response?.status === 400) {
        throw new BadRequestException('Invalid data for client update');
      } else if (error.response?.status === 401) {
        throw new UnauthorizedException('Authentication failed for update');
      }
      throw new InternalServerErrorException('Error updating client on Shopify');
    }
  }

  // Método para deletar um cliente na Shopify
  async deleteCustomer(customerId: string): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.delete(`${this.shopifyUrl}/${customerId}.json`, this.getHeaders())
      );
    } catch (error) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Authentication failed for deletion');
      }
      throw new InternalServerErrorException('Error deleting customer on Shopify');
    }
  }
}
