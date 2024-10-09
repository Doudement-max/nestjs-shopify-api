import { z } from 'zod';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

const VariantSchemaZod = z.object({
  id: z.number(),
  product_id: z.number(),
  title: z.string(),
  price: z.string(),
  sku: z.string().default(generateRandomSku),
  position: z.number().optional(),
  inventory_policy: z.string().optional(),
  compare_at_price: z.string().optional(),
  fulfillment_service: z.string().optional(),
  inventory_management: z.string().optional(),
  option1: z.string().optional(),
  option2: z.string().optional(),
  option3: z.string().optional(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  taxable: z.boolean().optional(),
  barcode: z.string().optional(),
  grams: z.number().optional(),
  image_id: z.number().optional(),
  weight: z.number().optional(),
  weight_unit: z.string().optional(),
  inventory_item_id: z.number().optional(),
  inventory_quantity: z.number().optional(),
  old_inventory_quantity: z.number().optional(),
  requires_shipping: z.boolean().optional(),
});

const OptionSchemaZod = z.object({
  id: z.number(),
  product_id: z.number(),
  name: z.string(),
  values: z.array(z.string()).optional(),
});

const ImageSchemaZod = z.object({
  id: z.number(),
  product_id: z.number(),
  position: z.number().optional(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  src: z.string().optional(),
  variant_ids: z.array(z.number()).optional(),
});

const ProductSchemaZod = z.object({
  id: z.number(),
  title: z.string(),
  body_html: z.string().optional(),
  vendor: z.string(),
  product_type: z.string().optional(),
  created_at: z.date().default(() => new Date()),
  handle: z.string().optional(),
  updated_at: z.date().default(() => new Date()),
  published_at: z.date().optional(),
  template_suffix: z.string().optional(),
  tags: z.string().optional(),
  published_scope: z.string().optional(),
  admin_graphql_api_id: z.string().optional(),
  variants: z.array(VariantSchemaZod).optional(),
  options: z.array(OptionSchemaZod).optional(),
  images: z.array(ImageSchemaZod).optional(),
  image: ImageSchemaZod.optional(),
});

@Schema()
export class Variant extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  product_id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: string;

  @Prop({ default: generateRandomSku })
  sku: string;

  @Prop()
  position?: number;

  @Prop()
  inventory_policy?: string;

  @Prop()
  compare_at_price?: string;

  @Prop()
  fulfillment_service?: string;

  @Prop()
  inventory_management?: string;

  @Prop()
  option1?: string;

  @Prop()
  option2?: string;

  @Prop()
  option3?: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop()
  taxable?: boolean;

  @Prop()
  barcode?: string;

  @Prop()
  grams?: number;

  @Prop()
  image_id?: number;

  @Prop()
  weight?: number;

  @Prop()
  weight_unit?: string;

  @Prop()
  inventory_item_id?: number;

  @Prop()
  inventory_quantity?: number;

  @Prop()
  old_inventory_quantity?: number;

  @Prop()
  requires_shipping?: boolean;
}

@Schema()
export class Option extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  product_id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  values?: string[];
}

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  product_id: number;

  @Prop()
  position?: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop()
  alt?: string;

  @Prop()
  width?: number;

  @Prop()
  height?: number;

  @Prop()
  src?: string;

  @Prop()
  variant_ids?: number[];
}

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  body_html?: string;

  @Prop({ required: true })
  vendor: string;

  @Prop()
  product_type?: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  handle?: string;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop()
  published_at?: Date;

  @Prop()
  template_suffix?: string;

  @Prop()
  tags?: string;

  @Prop()
  published_scope?: string;

  @Prop()
  admin_graphql_api_id?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Variant' })
  variants?: Variant[];

  @Prop({ type: [Types.ObjectId], ref: 'Option' })
  options?: Option[];

  @Prop({ type: [Types.ObjectId], ref: 'Image' })
  images?: Image[];

  @Prop({ type: Types.ObjectId, ref: 'Image' })
  image?: Image;
}

function generateRandomSku(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';
  for (let i = 0; i < 8; i++) {
    sku += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return sku;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
export const OptionSchema = SchemaFactory.createForClass(Option);
export const ImageSchema = SchemaFactory.createForClass(Image);
export const ProductSchema = SchemaFactory.createForClass(Product);

// Validating using Zod
export const validateProduct = (product: any) => {
  return ProductSchemaZod.parse(product);
};
