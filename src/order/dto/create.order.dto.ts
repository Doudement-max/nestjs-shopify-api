import { ApiProperty } from "@nestjs/swagger";

export class LineItem {
  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  readonly customer: string;
  readonly items: string[];
  readonly total: number;
  lineItems: LineItem[];
  totalTax: string;
  currency: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: [LineItem] })
  line_items: LineItem[];

  data: Date;
}

export class UpdateOrderDto {
  readonly items?: string[];
  readonly total?: number;
}

export class GetOrderDto {
  readonly id: string;
}

class ShopMoney {
  @ApiProperty()
  amount: string;

  @ApiProperty()
  currency_code: string;
}

class CurrentSubtotalPriceSet {
  @ApiProperty({ type: ShopMoney })
  shop_money: ShopMoney;

  @ApiProperty({ type: ShopMoney })
  presentment_money: ShopMoney;
}

export class OrderResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty({ type: CurrentSubtotalPriceSet })
  current_subtotal_price_set: CurrentSubtotalPriceSet;
}
