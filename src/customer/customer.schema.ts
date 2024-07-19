import { Schema, Document, model } from 'mongoose';
import { z } from 'zod';


const CustomerSchemaZod = z.object({
  customerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  order: z.array(z.string()).optional(),
  addresses: z.array(z.string()).optional(),
  shopifyId: z.string().optional(),
});


export interface CustomerModel extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  order?: string[];
  addresses?: string[];
  shopifyId?: string;
}


export const CustomerSchema = new Schema({
  customerId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  order: { type: [String], required: false },
  addresses: { type: [String], required: false },
  shopifyId: { type: String, required: false },
});


export const CustomerModel = model<CustomerModel>('Customer', CustomerSchema);


export const validateCustomer = (customer: any) => {
  return CustomerSchemaZod.parse(customer);
};
