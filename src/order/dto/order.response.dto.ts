import { ApiProperty } from "@nestjs/swagger";
import { LineItem} from "./create.order.dto";

export class OrderResposeDto{  
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    customer: string;
  
    @ApiProperty()
    items: string[];
  
    @ApiProperty()
    total: number;
  
    @ApiProperty({ type: [LineItem] })
    lineItems: LineItem[];
  
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