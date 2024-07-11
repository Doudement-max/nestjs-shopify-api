import { z } from 'zod';
import { CreateOrderSchemaType } from './dto/create.order.dto';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ResponseOrderDto } from './dto/response.order.dto';

const OrderSchemaZod = z.object({ 
  productId: z.string(), 
  customerId: z.string(),
  name: z.string(),
  customer: z.string().min(1),
  status: z.string().min(1),
  order: z.string().min(1),
  data: z.date(),
  totalAmount: z.number().min(0),
  cancelDate: z.date().optional(),
  cancelDetails: z.record(z.any()).optional(),
});

@Schema()
export class orderModel extends Document {
  @Prop()
  name: string;

  @Prop({required: true})
  customerId: string; 

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  order: string;

  @Prop({ required: true })
  data: Date;

  @Prop({ required: true })
  totalAmount: number; 

  @Prop()
  cancelDate: Date;

  @Prop({type: Object})
  cancelDetails: any;
  orderModel: any;

  async create(createOrderDto: any): Promise<ResponseOrderDto> {
    
    const validatedData = OrderSchemaZod.parse(createOrderDto);
    const newOrder = new this.orderModel(validatedData as CreateOrderSchemaType);
    const savedOrder = await newOrder.save();
    return savedOrder as ResponseOrderDto;
  }
}

export const OrderSchema = SchemaFactory.createForClass(orderModel);
