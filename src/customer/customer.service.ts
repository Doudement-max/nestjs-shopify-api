import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/customer.dto';
import { CustomerModel, ICustomer } from './customer.model';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  getCustomer: any;

  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<ICustomer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<ICustomer> {
    this.logger.log('Validating and creating a new customer...');
    
    // Verifica se o email já existe no banco
    const existingCustomer = await this.customerModel.findOne({ email: createCustomerDto.email }).exec();
    if (existingCustomer) {
      this.logger.warn('Customer with this email already exists');
      throw new BadRequestException('Customer with this email already exists');
    }

    // Cria e salva o cliente no MongoDB
    try{
    const newCustomer = new this.customerModel(createCustomerDto);
    return await newCustomer.save();
    } catch (error) {
      console.error(error);
    }
    return ;
  }

  async createAccountActivationUrl(id: string): Promise<{ account_activation_url: string }> {
    this.logger.log(`Creating account activation URL for customer with ID: ${id}`);
    try {
      // Simulação de criação de URL de ativação
      const activationUrl = `https://jsmith.myshopify.com/account/activate/${id}/9d10ba421022b7f47ca54985aa1ccc4d-1730833591`;
      return { account_activation_url: activationUrl };
    } catch (error) {
      this.logger.error(`Failed to create activation URL for customer with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to create activation URL');
    }
  }

  async sendAccountInvite(id: string, inviteData: { to: string; from: string; bcc: string[]; subject: string; custom_message: string; }): Promise<{ customer_invite: any }> {
    this.logger.log(`Sending account invite to customer with ID: ${id}`);
    try {
      // Simulação de envio de convite de conta
      const customerInvite = {
        to: inviteData.to,
        from: inviteData.from,
        subject: inviteData.subject,
        custom_message: inviteData.custom_message,
        bcc: inviteData.bcc,
      };
      this.logger.log(`Account invite sent to ${inviteData.to}`);
      return { customer_invite: customerInvite };
    } catch (error) {
      this.logger.error(`Failed to send account invite to customer with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new InternalServerErrorException('Failed to send account invite');
    }
  }

  async getCustomers(params: {
    apiVersion: string;
    createdAtMax?: string;
    createdAtMin?: string;
    fields?: string;
    ids?: string;
    limit?: number;
    sinceId?: string;
    updatedAtMax?: string;
    updatedAtMin?: string;
  }): Promise<ICustomer[]> {
    this.logger.log('Retrieving list of customers');
    try {
      const query: any = {};
      
      if (params.createdAtMax) {
        query.createdAt = { $lte: new Date(params.createdAtMax) };
      }
      if (params.createdAtMin) {
        query.createdAt = { ...query.createdAt, $gte: new Date(params.createdAtMin) };
      }
      if (params.ids) {
        query._id = { $in: params.ids.split(',') };
      }
      if (params.updatedAtMax) {
        query.updatedAt = { $lte: new Date(params.updatedAtMax) };
      }
      if (params.updatedAtMin) {
        query.updatedAt = { ...query.updatedAt, $gte: new Date(params.updatedAtMin) };
      }
      const projection = params.fields ? params.fields.split(',').join(' ') : null;
      const limit = params.limit ? Math.min(params.limit, 250) : 50;
      const skip = params.sinceId ? parseInt(params.sinceId, 10) : 0;
      
      const customers = await this.customerModel.find(query, projection).limit(limit).skip(skip).exec();
      return customers;
    } catch (error) {
      this.logger.error(`Error retrieving customers: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve customers');
    }
  }
}
