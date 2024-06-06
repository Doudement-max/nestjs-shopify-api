import { ApiProperty } from "@nestjs/swagger";
import { LineItemDto } from "./lineitem.dto";

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
  totalTax: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: [LineItemDto] })
  line_items: LineItemDto[];

  @ApiProperty()
  data: Date;
}
