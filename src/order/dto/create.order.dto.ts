import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createOrderSchema = z.object({
  customer: z.string(),
  items: z.array(z.string()),
  total: z.number(),
  lineItems: z.array(z.object({ id: z.number(), name: z.string() })),
  totalTax: z.string(),
  currency: z.string(),
  id: z.number(),
  email: z.string().email(),
  line_items: z.array(z.object({ id: z.number(), name: z.string() })),
  data: z.date(),
  productId: z.string(),
  quantity: z.number().min(1),
});

export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>;

class LineItemDto {
  @ApiProperty({ description: 'ID do item' })
  id: number;

  @ApiProperty({ description: 'Nome do item' })
  name: string;
  @ApiProperty({})
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number; 

}


export class CreateOrderDto {
  @ApiProperty({ description: 'Nome do cliente' })
  customer: string;

  @ApiProperty({ description: 'Lista de itens do pedido' })
  items: string[];

  @ApiProperty({ description: 'Valor total do pedido' })
  total: number;

  @ApiProperty({ description: 'Valor total de impostos' })
  totalTax: string;

  @ApiProperty({ description: 'Moeda utilizada' })
  currency: string;

  @ApiProperty({ description: 'ID do pedido' })
  id: number;

  @ApiProperty({ description: 'Endereço de e-mail do cliente' })
  email: string;

  @ApiProperty({ description: 'Data do pedido' })
  data: Date;  

  @ApiProperty({ description: 'Itens do pedido (alternativo)', type: [LineItemDto] })
  line_items: LineItemDto[];

  @ApiProperty({ description: 'Itens do pedido', type: [LineItemDto] })
  lineItems: LineItemDto[];
  
}


