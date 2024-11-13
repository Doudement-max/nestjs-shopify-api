import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs'; 
 

// Zod Schema for validation
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
  customerId: z.string().min(1, "Customer ID cannot be empty"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().optional(),
  verifiedEmail: z.boolean().optional(),
  addresses: z.array(addressSchemaZod).optional(),
  acceptsMarketing: z.boolean(),
  data: z.union([z.string().min(1, "Date cannot be empty"), z.date()]),
}); 

@ApiExtraModels(AddressDto)
export class AddressDto {
  @ApiProperty({ description: 'First line of address', required: false })
  address1?: string;

  @ApiProperty({ description: 'Second line of address', required: false })
  address2?: string;

  @ApiProperty({ description: 'City', required: false })
  city?: string;

  @ApiProperty({ description: 'Company name', required: false })
  company?: string;

  @ApiProperty({ description: 'Country', required: false })
  country?: string;

  @ApiProperty({ description: 'Country code', required: false })
  countryCode?: string;

  @ApiProperty({ description: 'Country name', required: false })
  countryName?: string;

  @ApiProperty({ description: 'Name', required: false })
  name?: string;

  @ApiProperty({ description: 'Phone number', required: false })
  phone?: string;

  @ApiProperty({ description: 'Province', required: false })
  province?: string;

  @ApiProperty({ description: 'Province code', required: false })
  provinceCode?: string;

  @ApiProperty({ description: 'Zip code', required: false })
  zip?: string;

  @ApiProperty({ description: 'Is it the default address?', required: false })
  default?: boolean;
}

@ApiExtraModels(AddressDto)
export class CreateCustomerDto extends createZodDto(createCustomerSchemaZod) {
  @ApiProperty({ description: 'Customer ID', required: true })
  customerId: string;

  //@ApiProperty({ description: 'Customer first name', required: true })
  //firstName: string;

  //@ApiProperty({ description: 'Customer last name', required: true })
  //lastName: string;

  //@ApiProperty({ description: 'Customer email', required: true, format: 'email' }) 
  //email: string;

  @ApiProperty({ description: 'Phone number', required: false })
  phone?: string;

  @ApiProperty({ description: 'List of addresses', type: [AddressDto], required: false })
  addresses?: AddressDto[];

  @ApiProperty({ description: 'Whether the email is verified', required: false })
  verifiedEmail?: boolean;

  @ApiProperty({ description: 'Accepts marketing', required: true })
  acceptsMarketing: boolean;

  @ApiProperty({ description: 'Date associated with customer', required: true, type: Date, format: 'date-time' })
  data: Date;
}

export class CreateCustomerResponse {
  @ApiProperty({ type: CreateCustomerDto })
  customer: Partial<CreateCustomerDto>;

  @ApiProperty({ description: 'JWT authentication token' })
  token: string;
}

// Função de validação utilizando Zod
export const validateCustomer = (data: any) => {
  return createCustomerSchemaZod.parse(data);
};
