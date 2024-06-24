import { ApiProperty } from "@nestjs/swagger";

export class LineItemDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number; 

}
