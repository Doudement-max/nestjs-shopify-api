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

  @ApiProperty({ description: 'Número de rastreamento' })
  tracking_number: string;

  @ApiProperty({ description: 'URL de rastreamento' })
  tracking_url: string;
}

// *** Response DTO para pedidos ***
export class ResponseOrderDto {
  @ApiProperty({ description: 'ID do pedido' })
  id: string;

  @ApiProperty({ description: 'ID do cliente' })
  customerId: string;

  @ApiProperty({ description: 'Nome do cliente' })
  customer: string;

  @ApiProperty({ description: 'Lista de itens do pedido' })
  items: string[];

  @ApiProperty({ description: 'Valor total do pedido' })
  total: number;

  @ApiProperty({ description: 'Itens detalhados do pedido', type: [LineItemDto] })
  lineItems: LineItemDto[];

  @ApiProperty({ description: 'Valor total de impostos' })
  totalTax: string;

  @ApiProperty({ description: 'Moeda utilizada' })
  currency: string;

  @ApiProperty({ description: 'Email do cliente' })
  email: string;

  @ApiProperty({ description: 'Data do pedido' })
  data: Date;

  @ApiProperty({ description: 'Status do pedido' })
  status: string;
}

// *** Transaction DTO ***
export class TransactionDto {
  @ApiProperty({ description: 'Tipo de transação' })
  kind: string;

  @ApiProperty({ description: 'Status da transação' })
  status: string;

  @ApiProperty({ description: 'Montante da transação' })
  amount: string;

  @ApiProperty({ description: 'Moeda utilizada' })
  currency: string;

  @ApiProperty({ description: 'Gateway de pagamento' })
  gateway: string;
}

// *** DTO para cancelamento de pedido ***
export class OrderCancelDto {
  @ApiProperty({ description: 'Status do pedido' })
  status: string;

  @ApiProperty({ description: 'Data de cancelamento' })
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
