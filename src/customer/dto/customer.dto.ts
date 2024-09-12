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
  @ApiProperty({ description: 'First line of address', required: true })
  address1?: string;

  @ApiProperty({ description: 'Second line of address', required: true })
  address2?: string;

  @ApiProperty({ description: 'City', required: true })
  city?: string;

  @ApiProperty({ description: 'Company name', required: true })
  company?: string;

  @ApiProperty({ description: 'Country', required: true })
  country?: string;

  @ApiProperty({ description: 'Country code', required: true })
  countryCode?: string;

  @ApiProperty({ description: 'Country name', required: true })
  countryName?: string;

  @ApiProperty({ description: 'Name', required: true })
  name?: string;

  @ApiProperty({ description: 'Phone number', required: true })
  phone?: string;

  @ApiProperty({ description: 'Province', required: true })
  province?: string;

  @ApiProperty({ description: 'Province code', required: true })
  provinceCode?: string;

  @ApiProperty({ description: 'Zip code', required: true })
  zip?: string;

  @ApiProperty({ description: 'Is it the default address?', required: true })
  default?: boolean;
}

// Classe CreateCustomerDto
export class CreateCustomerDto {
  @ApiProperty({ description: 'Customer', required: true })
  customer: string;

  @ApiProperty({ description: 'Customer Items', required: true })
  items: string[];

  @ApiProperty({ description: 'client id' })
  customerId: string;

  @ApiProperty({ description: 'Total', required: true })
  total: number;

  @ApiProperty({ description: 'Line Items', type: [LineItemDto], required: false })
  line_items: LineItemDto[];

  @ApiProperty({ description: 'Total Tax', required: true })
  totalTax: string;

  @ApiProperty({ description: 'Currency', required: true })
  currency: string;

  @ApiProperty({ description: 'Id', required: true })
  id: number;

  @ApiProperty({ description: 'First Name' })
  firstName: string;

  @ApiProperty({ description: 'Last Name' })
  lastName: string;

  @ApiProperty({ description: 'Customer email address', required: true, format: 'email', example: 'user@exemplo.com'})
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Product Id', required: true })
  productId: string;

  @ApiProperty({ description: 'Phone', required: true })
  phone?: string;

  @IsDate()
  @ApiProperty({ description: 'Data', required: true, type: Date, format: 'date-time' })
  data: Date;

  @ApiProperty({ description: 'Customer address list', type: [AddressDto], required: false })
  addresses?: AddressDto[];

  @ApiProperty({ description: 'Check email', required: true })
  verifiedEmail: boolean;

  @ApiProperty({ description: 'Accepts Marketing' })
  acceptsMarketing: boolean;
}

// Função de validação utilizando Zod
export const validateCustomer = (data: any) => {
  return createCustomerSchemaZod.parse(data);
};
