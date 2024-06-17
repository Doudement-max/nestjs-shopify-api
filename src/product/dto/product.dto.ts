import { ApiProperty } from "@nestjs/swagger";

export class VariantDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    product_id: number;
  
    @ApiProperty()
    title: string;
  
    @ApiProperty()
    price: string;
  
    @ApiProperty({ required: false })
    sku?: string;
  
    @ApiProperty()
    position: number;
  
    @ApiProperty()
    inventory_policy: string;
  
    @ApiProperty()
    compare_at_price: string;
  
    @ApiProperty()
    fulfillment_service: string;
  
    @ApiProperty()
    inventory_management: string;
  
    @ApiProperty()
    option1: string;
  
    @ApiProperty()
    option2: string;
  
    @ApiProperty()
    option3: string;
  
    @ApiProperty()
    created_at: Date;
  
    @ApiProperty()
    updated_at: Date;
  
    @ApiProperty()
    taxable: boolean;
  
    @ApiProperty()
    barcode: string;
  
    @ApiProperty()
    grams: number;
  
    @ApiProperty()
    image_id: number;
  
    @ApiProperty()
    weight: number;
  
    @ApiProperty()
    weight_unit: string;
  
    @ApiProperty()
    inventory_item_id: number;
  
    @ApiProperty()
    inventory_quantity: number;
  
    @ApiProperty()
    old_inventory_quantity: number;
  
    @ApiProperty()
    requires_shipping: boolean;
  }
  
  export class OptionDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    product_id: number;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty({ type: [String] })
    values: string[];
  }
  
  export class ImageDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    product_id: number;
  
    @ApiProperty()
    position: number;
  
    @ApiProperty()
    created_at: Date;
  
    @ApiProperty()
    updated_at: Date;
  
    @ApiProperty()
    alt: string;
  
    @ApiProperty()
    width: number;
  
    @ApiProperty()
    height: number;
  
    @ApiProperty()
    src: string;
  
    @ApiProperty({ type: [Number] })
    variant_ids: number[];
  }
  
export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body_html: string;

  @ApiProperty()
  vendor: string;

  @ApiProperty()
  product_type: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  handle: string;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  published_at: Date;

  @ApiProperty()
  template_suffix: string;

  @ApiProperty()
  tags: string;

  @ApiProperty()
  published_scope: string;

  @ApiProperty()
  admin_graphql_api_id: string;

  @ApiProperty({ type: [VariantDto] })
  variants: VariantDto[];

  @ApiProperty({ type: [OptionDto] })
  options: OptionDto[];

  @ApiProperty({ type: [ImageDto] })
  images: ImageDto[];

  @ApiProperty({ type: ImageDto })
  image: ImageDto;
}

