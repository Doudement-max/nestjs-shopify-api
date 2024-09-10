import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CustomerModel } from './customer.model'; // Importa o modelo Mongoose
import { validateCustomer } from './dto/customer.dto'; 
import { CreateCustomerDto } from './dto/customer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<CreateCustomerDto>,
  ) {}

  async findAll(): Promise<CreateCustomerDto[]> {
    try {
      this.logger.log('Buscando todos os clientes...');
      const customers = await this.customerModel.find().exec();
      this.logger.log(`Clientes recuperados: ${JSON.stringify(customers)}`);
      return customers;
    } catch (error) {
      this.logger.error(`Failed to fetch customers: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve customers');
    }
  }

  async findOne(id: string): Promise<CreateCustomerDto> {
    try {
      this.logger.log(`Falha ao buscar clientes: ${id}`);
      const customer = await this.customerModel.findById(id).exec();
      if (!customer) {
        this.logger.warn(`Cliente com ID ${id} não encontrado`);
        throw new NotFoundException('Cliente não encontrado');
      }
      this.logger.log(`Cliente recuperado: ${JSON.stringify(customer)}`);
      return customer;
    } catch (error) {
      this.logger.error(`Falha ao buscar cliente com ID ${id}: ${error.message}`);
      throw new InternalServerErrorException('Falha ao buscar cliente com ID');
    }
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log('Validando dados do cliente...');
    try {
      validateCustomer(createCustomerDto);
      this.logger.log('Dados do Cliente validados com sucesso!');
    } catch (error) {
      this.logger.error(`Erro na validação: ${error.message}`);
      throw new BadRequestException('Dados do cliente inválidos');
    }

    try {
      this.logger.log('Salvando novo cliente no banco de dados...');
      const newCustomer = new this.customerModel(createCustomerDto);
      const savedCustomer = await newCustomer.save();

      this.logger.log(`Cliente criado com sucesso com ID: ${savedCustomer._id}`);
      return savedCustomer;
    } catch (error) {
      this.logger.error(`Failed to create customer: ${error.message}`);
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async update(id: string, createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto> {
    this.logger.log(`Atualizando cliente com ID: ${id}`);
    try {
      validateCustomer(createCustomerDto);
      this.logger.log('Dados do cliente validados com sucesso!');
    } catch (error) {
      this.logger.error(`Erro de validação: ${error.message}`);
      throw new BadRequestException('Dados do cliente inválidos');
    }

    try {
      const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, createCustomerDto, { new: true }).exec();
      if (!updatedCustomer) {
        this.logger.warn(`Cliente com ID ${id} não encontrado`);
        throw new NotFoundException('Cliente não encontrado');
      }

      this.logger.log(`Cliente atualizado com sucesso: ${JSON.stringify(updatedCustomer)}`);
      return updatedCustomer;
    } catch (error) {
      this.logger.error(`Falha ao atualizar cliente com ID ${id}: ${error.message}`);
      throw new InternalServerErrorException('Falha ao atualizar cliente');
    }
  }

  async remove(id: string): Promise<CreateCustomerDto> {
    this.logger.log(`Removendo cliente com ID: ${id}`);
    try {
      const deletedCustomer = await this.customerModel.findByIdAndDelete(id).exec();
      if (!deletedCustomer) {
        this.logger.warn(`Cliente com ID ${id} não encontrado`);
        throw new NotFoundException('Cliente não encontrado');
      }

      this.logger.log(`Cliente removido com sucesso: ${JSON.stringify(deletedCustomer)}`);
      return deletedCustomer;
    } catch (error) {
      this.logger.error(`Falha ao remover cliente com ID ${id}: ${error.message}`);
      throw new InternalServerErrorException('Falha ao remover cliente');
    }
  }
}
