import mongoose, { Schema, Types } from 'mongoose';

type SpecificationsType = {
  cpu?: string,
  ram?: string,
  storage?: string,
  gpu?: string,
  screenSize?: string,
  refreshRate?: string,
  battery?: string,
  color?: string,
  weight?: string,
};

type ProductType = {
  name: string,
  description?: string,
  price: number,
  discountPrice?: number,
  stockQuantity: number,
  brand?: string,
  images?: string[],
  specifications?: SpecificationsType,
  status: string,
  categoryId: Types.ObjectId,
};

const productSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name."],
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: [true, "Please enter a price."],
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    stockQuantity: {
      type: Number,
      required: [true, "Please enter a stock quantity."],
      default: 0,
    },

    brand: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    specifications: {
      cpu: String,
      ram: String,
      storage: String,
      gpu: String,
      screenSize: String,
      refreshRate: String,
      battery: String,
      color: String,
      weight: String,
    },

    status: {
      type: String,
      enum: ["active", "out_of_stock"],
      default: "active",
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please enter a category."],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<ProductType>("Product", productSchema);

export default Product;