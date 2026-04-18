import mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    stockQuantity: {
      type: Number,
      required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);


module.exports = Product;