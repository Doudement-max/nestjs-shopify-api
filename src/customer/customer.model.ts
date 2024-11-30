import { Schema, model, Document } from 'mongoose';

// Define an interface for the Customer document
export interface ICustomer extends Document {
  customerId: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  verifiedEmail?: boolean; 
  data: Date;
  addresses?: {
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    phone?: string;
    zip?: string;
    lastName?: string;
    firstName?: string;
    country?: string;
  }[];
  metafields?: {
    key: string;
    value: string;
    type: string;
    namespace: string;
  }[];
  customer: any;
  items: any;
  total: any;
  line_items: any;
  totalTax: string; // Adicionado
  currency: string; // Adicionado
  firstName: string; // Adicionado
  lastName: string; // Adicionado
}

// Mongoose schema definition
export const customerMongooseSchema = new Schema<ICustomer>({
  customerId: { type: String,},
  email: { type: String, required: true },
  password: { type: String, required: true },
  passwordConfirmation: { type: String, required: true },
  verifiedEmail: { type: Boolean },
  addresses: [{
    address1: String,
    address2: String,
    city: String,
    province: String,
    phone: String,
    zip: String,
    lastName: String,
    firstName: String,
    country: String,
  }],
  metafields: [{
    key: String,
    value: String,
    type: String,
    namespace: String,
  }],
  customer: Schema.Types.Mixed,
  items: Schema.Types.Mixed,
  total: Schema.Types.Mixed,
  line_items: Schema.Types.Mixed,
  totalTax: { type: String }, // Adicionado
  currency: { type: String }, // Adicionado
  firstName: { type: String, required: true }, // Adicionado
  lastName: { type: String, required: true }, // Adicionado
}, {
  timestamps: true
});

// Export the Mongoose model and the TypeScript type for Customer
export const CustomerModel = model<ICustomer>('Customer', customerMongooseSchema);
