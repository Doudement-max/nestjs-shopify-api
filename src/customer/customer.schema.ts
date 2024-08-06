import { Schema, Document, model } from 'mongoose';
import { z } from 'zod';
import { AddressDto } from './dto/address.dto';


const addressSchema = new Schema({
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  company: { type: String },
  country: { type: String, required: true },
  countryCode: { type: String, required: true },
  countryName: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  province: { type: String, required: true },
  provinceCode: { type: String, required: true },
  zip: { type: String, required: true },
  default: { type: Boolean }
});

const customerSchema = new Schema({
  customerId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  order: { type: [String] },
  addresses: { type: [addressSchema] },
  shopifyId: { type: String }
});

export interface CustomerModel extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | undefined;
  order: string[] | undefined;
  addresses: AddressDto[] | undefined;
  shopifyId: string | undefined;
}


const addressSchemaZod = z.object({
  customerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  order: z.array(z.string()),
  addresses: z.array(z.object({
    address1: z.string(),
    address2: z.string(),
    city: z.string(),
    company: z.string(),
    country: z.string(),
    countryCode: z.string(),
    countryName: z.string(),
    name: z.string(),
    phone: z.string(),
    province: z.string(),
    provinceCode: z.string(),
    zip: z.string(),
    default: z.boolean(),
  })),
  shopifyId: z.string(),
});


const customerSchemaZod = z.object({
  customerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  order: z.array(z.string()).optional(),
  addresses: z.array(addressSchemaZod).optional(),
  shopifyId: z.string().optional(),
});

const validateCustomer = (customer: any) => {
  return customerSchemaZod.parse(customer);
};

export { customerSchema, validateCustomer };
export const Customer = model('Customer', customerSchema);