import { ApiProperty } from '@nestjs/swagger';
import { LineItemDto } from 'src/order/dto/lineitem.dto';
import { date, z } from 'zod';
import { IsDate, IsEmail } from 'class-validator';

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

export const createCustomerSchemaZod = z.object({
  customerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  verified_email: z.boolean().optional(),
  addresses: z.array(addressSchemaZod).optional(),
  verifiedEmail: z.boolean().optional(),
  acceptsMarketing: z.boolean(),
  data: z.union([z.string(), z.date()]), // Simplesmente validando como Date no Zod
});

// Classe AddressDto
export class AddressDto {
  @ApiProperty({ description: 'Primeira linha do endereço', required: true })
  address1?: string;

  @ApiProperty({ description: 'Segunda linha do endereço', required: true })
  address2?: string;

  @ApiProperty({ description: 'Cidade', required: true })
  city?: string;

  @ApiProperty({ description: 'Nome da empresa', required: true })
  company?: string;

  @ApiProperty({ description: 'País', required: true })
  country?: string;

  @ApiProperty({ description: 'Código do país', required: true })
  countryCode?: string;

  @ApiProperty({ description: 'Nome do país', required: true })
  countryName?: string;

  @ApiProperty({ description: 'Nome', required: true })
  name?: string;

  @ApiProperty({ description: 'Número de telefone', required: true })
  phone?: string;

  @ApiProperty({ description: 'Província', required: true })
  province?: string;

  @ApiProperty({ description: 'Código da província', required: true })
  provinceCode?: string;

  @ApiProperty({ description: 'Código postal', required: true })
  zip?: string;

  @ApiProperty({ description: 'É o endereço padrão?', required: true })
  default?: boolean;
}

// Classe CreateCustomerDto
export class CreateCustomerDto {
  @ApiProperty({ description: 'Cliente', required: true })
  customer: string;

  @ApiProperty({ description: 'Itens do cliente', required: true })
  items: string[];

  @ApiProperty({ description: 'Id do cliente' })
  customerId: string;

  @ApiProperty({ description: 'Total', required: true })
  total: number;

  @ApiProperty({ description: 'Itens de linha', type: [LineItemDto], required: false })
  line_items: LineItemDto[];

  @ApiProperty({ description: 'Taxa total', required: true })
  totalTax: string;

  @ApiProperty({ description: 'Moeda', required: true })
  currency: string;

  @ApiProperty({ description: 'Id', required: true })
  id: number;

  @ApiProperty({ description: 'Primeiro nome do cliente' })
  firstName: string;

  @ApiProperty({ description: 'Último nome do cliente' })
  lastName: string;

  @ApiProperty({ description: 'Endereço de email do cliente', required: true, format: 'email', example: 'user@exemplo.com'})
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Id do produto', required: true })
  productId: string;

  @ApiProperty({ description: 'Número de telefone', required: true })
  phone?: string;

  @IsDate()
  @ApiProperty({ description: 'Data', required: true, type: Date, format: 'date-time' })
  data: Date;

  @ApiProperty({ description: 'Lista de endereços do cliente', type: [AddressDto], required: false })
  addresses?: AddressDto[];

  @ApiProperty({ description: 'Verificar o email', required: true })
  verifiedEmail: boolean;

  @ApiProperty({ description: 'Solicitação de marketing' })
  acceptsMarketing: boolean;
}

// Função de validação utilizando Zod
export const validateCustomer = (data: any) => {
  return createCustomerSchemaZod.parse(data);
};
