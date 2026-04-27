import mongoose, { Schema, Types } from 'mongoose';

type OrderType = {
  userId: Types.ObjectId,
  totalPrice: number,
  paymentMethod: string,
  paymentStatus: string,
  orderStatus: string,
  shippingAddress: string,
};

const orderSchema = new Schema<OrderType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter a user."],
    },

    totalPrice: {
      type: Number,
      required: [true, "Please enter a total price."],
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card", "wallet"],
      default: "cash",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    shippingAddress: {
      type: String,
      required: [true, "Please enter a shipping address."],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderType>("Order", orderSchema);

export default Order;