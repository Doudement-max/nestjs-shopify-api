import { ApiProperty } from '@nestjs/swagger';
import { LineItemDto } from './lineitem.dto';

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

  @ApiProperty({ type: [LineItemDto], description: 'Itens detalhados do pedido' })
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
