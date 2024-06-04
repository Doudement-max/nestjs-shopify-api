import { ApiProperty } from "@nestjs/swagger";
import { LineItem } from "./create.order.dto";

export class UpdateOrderDto {
    @ApiProperty({required: false})
    readonly customer?: string;

    @ApiProperty({required: false}) 
    readonly items?: string[];

    @ApiProperty({ required: false })
    readonly total?: number;

    @ApiProperty({type:[LineItem], required: false })
    lineItem?: LineItem[];

    @ApiProperty({ required: false})
    totalTax: string;

    @ApiProperty({ required: false }) 
    data?: Date;

    @ApiProperty({required: false})
    status?: string;
}