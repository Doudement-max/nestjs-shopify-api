import { Schema } from 'mongoose';

export const VariantSchema = new Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  sku: { type: String, default: generateRandomSku },
  position: { type: Number },
  inventory_policy: { type: String },
  compare_at_price: { type: String },
  fulfillment_service: { type: String },
  inventory_management: { type: String },
  option1: { type: String },
  option2: { type: String },
  option3: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  taxable: { type: Boolean },
  barcode: { type: String },
  grams: { type: Number },
  image_id: { type: Number },
  weight: { type: Number },
  weight_unit: { type: String },
  inventory_item_id: { type: Number },
  inventory_quantity: { type: Number },
  old_inventory_quantity: { type: Number },
  requires_shipping: { type: Boolean }
});

export const OptionSchema = new Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  values: [{ type: String }]
});

export const ImageSchema = new Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  position: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  alt: { type: String },
  width: { type: Number },
  height: { type: Number },
  src: { type: String },
  variant_ids: [{ type: Number }]
});

export const ProductSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  body_html: { type: String },
  vendor: { type: String, required: true },
  product_type: { type: String },
  created_at: { type: Date, default: Date.now },
  handle: { type: String },
  updated_at: { type: Date, default: Date.now },
  published_at: { type: Date },
  template_suffix: { type: String },
  tags: { type: String },
  published_scope: { type: String },
  admin_graphql_api_id: { type: String },
  variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
  options: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
  image: { type: Schema.Types.ObjectId, ref: 'Image' }
});

function generateRandomSku(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';
  for (let i = 0; i < 8; i++) {
    sku += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return sku;
}
