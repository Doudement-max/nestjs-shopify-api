import { Schema, model, Document } from 'mongoose';

// Define an interface for the Customer document
export interface ICustomer extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  order?: string[];
  addresses?: {
    address1?: string;
    address2?: string;
    city?: string;
    company?: string;
    country?: string;
    countryCode?: string;
    countryName?: string;
    name?: string;
    phone?: string;
    province?: string;
    provinceCode?: string;
    zip?: string;
    default?: boolean;
  }[];
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
  defaultAddress?: {
    address1?: string;
    address2?: string;
    city?: string;
    company?: string;
    country?: string;
    countryCode?: string;
    countryName?: string;
    name?: string;
    phone?: string;
    province?: string;
    provinceCode?: string;
    zip?: string;
    default?: boolean;
  };
}

// Mongoose schema definition
export const customerMongooseSchema = new Schema<ICustomer>({
  customerId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  order: [{ type: String }],
  addresses: [{
    address1: String,
    address2: String,
    city: String,
    company: String,
    country: String,
    countryCode: String,
    countryName: String,
    name: String,
    phone: String,
    province: String,
    provinceCode: String,
    zip: String,
    default: Boolean,
  }],
  state: { type: String },
  note: { type: String },
  verifiedEmail: { type: Boolean },
  tags: { type: String },
  lastOrderId: { type: String },
  lastOrderName: { type: String },
  currency: { type: String },
  acceptsMarketing: { type: Boolean },
  marketingOptInLevel: { type: String },
  taxExempt: { type: Boolean },
  taxExemptions: [{ type: String }],
  totalSpent: { type: String },
  orderCount: { type: Number },
  multipassIdentifier: { type: String },
  adminGraphqlApiId: { type: String },
  defaultAddress: {
    address1: String,
    address2: String,
    city: String,
    company: String,
    country: String,
    countryCode: String,
    countryName: String,
    name: String,
    phone: String,
    province: String,
    provinceCode: String,
    zip: String,
    default: Boolean,
  }
}, {
  timestamps: true
});

// Export the Mongoose model and the TypeScript type for Customer
export const CustomerModel = model<ICustomer>('Customer', customerMongooseSchema);
