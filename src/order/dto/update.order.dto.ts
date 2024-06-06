import { ApiProperty } from "@nestjs/swagger";
import { LineItemDto } from "./lineitem.dto";

export class UpdateOrderDto {
    @ApiProperty({required: false})
    readonly customer?: string;

    @ApiProperty({required: false}) 
    readonly items?: string[];

    @ApiProperty({ required: false })
    readonly total?: number;

    @ApiProperty({type:[LineItemDto], required: false })
    lineItem?: LineItemDto[];

    @ApiProperty({ required: false})
    totalTax: string;

    @ApiProperty({ required: false }) 
    data?: Date;

    @ApiProperty({required: false})
    status?: string;
}