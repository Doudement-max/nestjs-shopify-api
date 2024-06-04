import { ApiProperty } from "@nestjs/swagger";

export class FulfillmentDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  tracking_number: string;

  @ApiProperty()
  tracking_url: string;
}
