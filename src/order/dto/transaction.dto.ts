import { ApiProperty } from "@nestjs/swagger";

export class TransactionDto {
  @ApiProperty()
  kind: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  gateway: string;
}
