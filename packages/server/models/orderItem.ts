import mongoose, { Schema, Types } from 'mongoose';

type OrderItemType = {
  orderId: Types.ObjectId,
  productId: Types.ObjectId,
  quantity: number,
  price: number,
  subtotal: number,
};

const orderItemSchema = new Schema<OrderItemType>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Please enter an order."],
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please enter a product."],
    },

    quantity: {
      type: Number,
      required: [true, "Please enter a quantity."],
    },

    price: {
      type: Number,
      required: [true, "Please enter a price."],
    },

    subtotal: {
      type: Number,
      required: [true, "Please enter a subtotal."],
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model<OrderItemType>("OrderItem", orderItemSchema);

export default OrderItem;