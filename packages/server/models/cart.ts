import mongoose, { Schema, Types } from 'mongoose';

type CartType = {
  userId: Types.ObjectId,
  productId: Types.ObjectId,
  quantity: number,
  priceAtTime: number,
};

const cartSchema = new Schema<CartType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter a user."],
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please enter a product."],
    },

    quantity: {
      type: Number,
      required: [true, "Please enter a quantity."],
      default: 1,
    },

    priceAtTime: {
      type: Number,
      required: [true, "Please enter a price."],
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<CartType>("Cart", cartSchema);

export default Cart;