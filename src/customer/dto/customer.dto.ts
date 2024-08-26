/*import { z } from 'zod';
import { customerSchemaZod } from '../customer.model';

// DTO para Address
export class AddressDto {
  address1: string;
  address2?: string;
  city: string;
  company?: string;
  country: string;
  countryCode: string;
  countryName: string;
  name: string;
  phone: string;
  province: string;
  provinceCode: string;
  zip: string;
  default?: boolean;
}

// DTO para Customer
export class CustomerDto {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  order?: string[];
  addresses?: AddressDto[];
  shopifyId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  state?: string;
  note?: string;
  verifiedEmail?: boolean;
  tags?: string;
  lastOrderId?: string;
  lastOrderName?: string;
  currency?: string;
  acceptsMarketing?: boolean;
  marketingOptInLevel?: string;
  taxExempt?: boolean;
  taxExemptions?: string[];
  totalSpent?: string;
  orderCount?: number;
  multipassIdentifier?: string;
  adminGraphqlApiId?: string;
  defaultAddress?: AddressDto;
}

//CreateCustomerDto 
export class CreateCustomerDto {
  customerId: string;
  firstName: string; 
  lastName: string; 
  email: string; 
  phone?: string; 
  addresses?: AddressDto[]; 
  verifiedEmail?: boolean; 
  acceptsMarketing: boolean;
} 

//validação do createcustomerdto em zod 
export const validateCustomer = (data: any) => {
  return customerSchemaZod.parse(data);
};*/

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
export type AddressDto = z.infer<typeof addressSchemaZod>;
export type CustomerDto = z.infer<typeof customerSchemaZod>;

// CreateCustomerDto - podemos simplificar se for necessário um DTO específico para criação
export class CreateCustomerDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses?: AddressDto[];
  verifiedEmail?: boolean;
  acceptsMarketing: boolean;
}

// Validação do CustomerDto em Zod
export const validateCustomer = (data: any) => {
  return customerSchemaZod.parse(data);
};