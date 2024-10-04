import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

// *** Zod Schema para criação de pedidos ***
export const createOrderSchema = z.object({
  customerId: z.string(),
  customer: z.string(),
  items: z.array(z.string()),                          
  total: z.number(),                                   
  totalTax: z.string(),                                
  currency: z.string(),                                
  id: z.number(),                                      
  email: z.string().email(),                           
  line_items: z.array(z.object({                       
    id: z.number(),
    name: z.string()
  })),
  data: z.date(),                                      
  productId: z.string(),                               
  quantity: z.number().min(1),                        
});

// Tipo inferido a partir do schema Zod
export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>;

// *** LineItem DTO ***
export class LineItemDto {
  @ApiProperty({ description: 'Item Id' })
  id: number;

  @ApiProperty({ description: 'Item name' })
  name: string;

  @ApiProperty({ description: 'title' })
  title: string;

  @ApiProperty({ description: 'Item Price' })
  price: number;

  @ApiProperty({ description: 'Item Quantity' })
  quantity: number;
}

// *** DTO para criação de pedidos ***
export class CreateOrderDto {
  @ApiProperty({ description: 'Customer Name' })
  customer: string;

  @ApiProperty({ description: 'Items List for Order ', type: [String] })
  items: string[]; 

  @ApiProperty({ description: 'Order Total' })
  total: number;

  @ApiProperty({ description: 'Total Tax' })
  totalTax: string;

  @ApiProperty({ description: 'Currency' })
  currency: string;

  @ApiProperty({ description: 'Order Id' })
  id: number;

  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'Order Data' })
  data: Date;  

  @ApiProperty({ description: 'Line items', type: [LineItemDto] })
  line_items: LineItemDto[];

  @ApiProperty({ description: 'Customer Id' })
  customerId: string;

  @ApiProperty({ description: 'Product Id' })
  productId: string;

  @ApiProperty({ description: 'Product Quantity' })
  quantity: number;
}

// *** Fulfillment DTO ***
export class FulfillmentDto {
  @ApiProperty({ description: 'Fulfillment Status' })
  status: string;

  @ApiProperty({ description: 'Tracking Number' })
  tracking_number: string;

  @ApiProperty({ description: 'Tracking Url' })
  tracking_url: string;
}

// *** Response DTO para pedidos ***
export class ResponseOrderDto {
  @ApiProperty({ description: 'Order Id' })
  id: string;

  @ApiProperty({ description: 'Customer Id' })
  customerId: string;

  @ApiProperty({ description: 'Customer' })
  customer: string;

  @ApiProperty({ description: 'Items List for Order' })
  items: string[];

  @ApiProperty({ description: 'total value' })
  total: number;

  @ApiProperty({ description: 'Line Items Order', type: [LineItemDto] })
  lineItems: LineItemDto[];

  @ApiProperty({ description: 'Total Tax' })
  totalTax: string;

  @ApiProperty({ description: 'Currency' })
  currency: string;

  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'Order Data' })
  data: Date;

  @ApiProperty({ description: 'Order Status' })
  status: string;
}

// *** Transaction DTO ***
export class TransactionDto {
  @ApiProperty({ description: ' Transation Type' })
  kind: string;

  @ApiProperty({ description: 'Transation Status' })
  status: string;

  @ApiProperty({ description: 'Transation Amount' })
  amount: string;

  @ApiProperty({ description: 'Currency' })
  currency: string;

  @ApiProperty({ description: 'Payment Gateway' })
  gateway: string;
}

// *** DTO para cancelamento de pedido ***
export class OrderCancelDto {
  @ApiProperty({ description: 'Order Status' })
  status: string;

  @ApiProperty({ description: 'Cancel Date' })
  cancelDate: Date;
}

// *** DTO para atualização de pedido ***
export class UpdateOrderDto {
  @ApiProperty({ required: false })
  customer?: string;

  @ApiProperty({ required: false }) 
  items?: string[];

  @ApiProperty({ required: false })
  total?: number;

  @ApiProperty({ type: [LineItemDto], required: false })
  lineItems?: LineItemDto[];

  @ApiProperty({ required: false })
  totalTax?: string;

  @ApiProperty({ required: false }) 
  data?: Date;

  @ApiProperty({ required: false })
  status?: string;
}
