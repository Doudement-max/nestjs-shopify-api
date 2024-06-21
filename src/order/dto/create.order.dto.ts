
import { ApiProperty } from '@nestjs/swagger';
import { LineItemDto } from './lineitem.dto';
import { z } from 'zod'

export class CreateOrderDto {
  @ApiProperty()
  readonly customer: string;

  @ApiProperty()
  readonly items: string[];

  @ApiProperty()
  readonly total: number;

  @ApiProperty({ type: [LineItemDto] })
  lineItems: LineItemDto[];

  @ApiProperty()
  readonly totalTax: string;

  @ApiProperty()
  readonly currency: string;

  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty({ type: [LineItemDto] })
  line_items: LineItemDto[];

  @ApiProperty()
  readonly data: Date; 
}

export const createOrderSchema = z.object({
  customer: z.string(),
  items: z.array(z.string()),
  total: z.number(),
  lineItems: z.array(z.object({id: z.number(), name: z.string() })),
  totalTax: z.string(),
  currency: z.string(),
  id: z.number(),
  email: z.string().email(),
  line_items: z.array(z.object({id: z.number(), name: z.string() })),
  data: z.date(),
  productId: z.string(), 
  quantity: z.number().min(1), 
});

export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>;
