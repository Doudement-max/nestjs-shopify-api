import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

// Esquema Zod para Address
export const addressSchemaZod = z.object({
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.string().optional(),
  countryName: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  provinceCode: z.string().optional(),
  zip: z.string().optional(),
  default: z.boolean().optional(),
});

// Transformar AddressDto em uma classe para ser usada em tempo de execução
export class AddressDto {
  @ApiProperty({ description: 'Primeira linha do endereço', required: false })
  address1?: string;

  @ApiProperty({ description: 'Segunda linha do endereço', required: false })
  address2?: string;

  @ApiProperty({ description: 'Cidade', required: false })
  city?: string;

  @ApiProperty({ description: 'Nome da empresa', required: false })
  company?: string;

  @ApiProperty({ description: 'País', required: false })
  country?: string;

  @ApiProperty({ description: 'Código do país', required: false })
  countryCode?: string;

  @ApiProperty({ description: 'Nome do país', required: false })
  countryName?: string;

  @ApiProperty({ description: 'Nome', required: false })
  name?: string;

  @ApiProperty({ description: 'Número de telefone', required: false })
  phone?: string;

  @ApiProperty({ description: 'Província', required: false })
  province?: string;

  @ApiProperty({ description: 'Código da província', required: false })
  provinceCode?: string;

  @ApiProperty({ description: 'Código postal', required: false })
  zip?: string;

  @ApiProperty({ description: 'É o endereço padrão?', required: false })
  default?: boolean;
}

// Esquema Zod para Customer
export const customerSchemaZod = z.object({
  customerId: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  order: z.array(z.string()).optional(),
  addresses: z.array(addressSchemaZod).optional(),
  shopifyId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  state: z.string().optional(),
  note: z.string().optional(),
  verifiedEmail: z.boolean().optional(),
  tags: z.string().optional(),
  lastOrderId: z.string().optional(),
  lastOrderName: z.string().optional(),
  currency: z.string().optional(),
  acceptsMarketing: z.boolean().optional(),
  marketingOptInLevel: z.string().optional(),
  taxExempt: z.boolean().optional(),
  taxExemptions: z.array(z.string()).optional(),
  totalSpent: z.string().optional(),
  orderCount: z.number().optional(),
  multipassIdentifier: z.string().optional(),
  adminGraphqlApiId: z.string().optional(),
  defaultAddress: addressSchemaZod.optional(),
});

// Inferir tipos a partir do esquema Zod
export type AddressDtoType = z.infer<typeof addressSchemaZod>;

export class CustomerDto {
  @ApiProperty({ description: 'Identificador único para o cliente' })
  customerId: string;

  @ApiProperty({ description: 'Primeiro nome do cliente' })
  firstName: string;

  @ApiProperty({ description: 'Último nome do cliente' })
  lastName: string;

  @ApiProperty({ description: 'Endereço de email do cliente' })
  email: string;

  @ApiProperty({ description: 'Número de telefone do cliente', required: false })
  phone?: string;

  @ApiProperty({ description: 'Lista de endereços do cliente', type: [AddressDto], required: false })
  addresses?: AddressDto[];

  @ApiProperty({ description: 'Lista de IDs de pedidos associados ao cliente', required: false })
  order?: string[];

  @ApiProperty({ description: 'ID do cliente no Shopify', required: false })
  shopifyId?: string;

  @ApiProperty({ description: 'Data de criação do cliente', required: false })
  createdAt?: Date;

  @ApiProperty({ description: 'Data da última atualização do cliente', required: false })
  updatedAt?: Date;

  @ApiProperty({ description: 'Estado do cliente', required: false })
  state?: string;

  @ApiProperty({ description: 'Notas sobre o cliente', required: false })
  note?: string;

  @ApiProperty({ description: 'O email foi verificado?', required: false })
  verifiedEmail?: boolean;

  @ApiProperty({ description: 'Tags associadas ao cliente', required: false })
  tags?: string;

  @ApiProperty({ description: 'ID do último pedido associado ao cliente', required: false })
  lastOrderId?: string;

  @ApiProperty({ description: 'Nome do último pedido associado ao cliente', required: false })
  lastOrderName?: string;

  @ApiProperty({ description: 'Moeda usada pelo cliente', required: false })
  currency?: string;

  @ApiProperty({ description: 'O cliente aceita marketing?', required: false })
  acceptsMarketing?: boolean;

  @ApiProperty({ description: 'Nível de opt-in de marketing do cliente', required: false })
  marketingOptInLevel?: string;

  @ApiProperty({ description: 'O cliente está isento de impostos?', required: false })
  taxExempt?: boolean;

  @ApiProperty({ description: 'Isenções fiscais do cliente', required: false })
  taxExemptions?: string[];

  @ApiProperty({ description: 'Total gasto pelo cliente', required: false })
  totalSpent?: string;

  @ApiProperty({ description: 'Total de pedidos feitos pelo cliente', required: false })
  orderCount?: number;

  @ApiProperty({ description: 'Identificador Multipass do cliente', required: false })
  multipassIdentifier?: string;

  @ApiProperty({ description: 'ID da API GraphQL do administrador do cliente', required: false })
  adminGraphqlApiId?: string;

  @ApiProperty({ description: 'Endereço padrão do cliente', type: AddressDto, required: false })
  defaultAddress?: AddressDto;
}

export class CreateCustomerDto {
  @ApiProperty({ description: 'Primeiro nome do cliente' })
  firstName: string;

  @ApiProperty({ description: 'Último nome do cliente' })
  lastName: string;

  @ApiProperty({ description: 'Endereço de Email do Cliente' })
  email: string;

  @ApiProperty({ description: 'Número de telefone', required: false })
  phone?: string;

  @ApiProperty({ description: 'Lista de endereços do cliente', type: [AddressDto], required: false })
  addresses?: AddressDto[];

  @ApiProperty({ description: 'Verificar o email', required: false })
  verifiedEmail?: boolean;

  @ApiProperty({ description: 'Solicitação de marketing' })
  acceptsMarketing: boolean;
}

// Validação do CustomerDto em Zod
export const validateCustomer = (data: any) => {
  return customerSchemaZod.parse(data);
};
