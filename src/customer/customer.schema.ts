import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AddressDto } from './dto/address.dto';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: [{ type: String }] })
  orders: string[];

  @Prop({ type: [{ street: String, city: String, state: String, zipCode: String, country: String }] })
  addresses: AddressDto[];

  @Prop()
  shopifyId: string;
}

export type CustomerDocument = Customer & Document;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
