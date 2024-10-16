import { Schema, model } from 'mongoose';

// Mongoose schema for the client
export const customerMongooseSchema = new Schema({
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
  timestamps: true  // Mongoose schema for the client
});

//Exporting the Mongoose model
export const CustomerModel = model('Customer', customerMongooseSchema);
