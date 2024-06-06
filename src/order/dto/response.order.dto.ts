import { ApiProperty } from "@nestjs/swagger";
import { LineItemDto } from "./lineitem.dto";

export class ResposeOrderDto{  
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    customer: string;
  
    @ApiProperty()
    items: string[];
  
    @ApiProperty()
    total: number;
  
    @ApiProperty({ type: [LineItemDto] })
    lineItems: LineItemDto[];
  
    @ApiProperty()
    totalTax: string;
  
    @ApiProperty()
    currency: string;
  
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    data: Date;
  
    @ApiProperty()
    status: string;
}