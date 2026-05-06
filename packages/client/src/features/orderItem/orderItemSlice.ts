import { createSlice } from "@reduxjs/toolkit";
import type { OrderItem } from "../../types";
import { getAllOrderItems, getSingleOrderItem, addOrderItem, updateOrderItem, deleteOrderItem } from "./orderItemThunks";

export interface OrderItemState {
  orderItems: OrderItem[];
  orderItem: OrderItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderItemState = {
  orderItems: [],
  orderItem: null,
  loading: false,
  error: null,
};

export const orderItemSlice = createSlice({
  name: "orderItem",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllOrderItems
      .addCase(getAllOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItems = action.payload.data.orderItems || [];
      })
      .addCase(getAllOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch order items";
      })
      // getSingleOrderItem
      .addCase(getSingleOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload.data.orderItem || null;
      })
      .addCase(getSingleOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch order item";
      })
      // addOrderItem
      .addCase(addOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.orderItem) {
          state.orderItems.push(action.payload.data.orderItem);
        }
      })
      .addCase(addOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add order item";
      })
      // updateOrderItem
      .addCase(updateOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrderItem = action.payload.data.orderItem;
        if (updatedOrderItem) {
          state.orderItem = updatedOrderItem;
          const index = state.orderItems.findIndex((o) => o._id === updatedOrderItem._id);
          if (index !== -1) {
            state.orderItems[index] = updatedOrderItem;
          }
        }
      })
      .addCase(updateOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update order item";
      })
      // deleteOrderItem
      .addCase(deleteOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.orderItems = state.orderItems.filter((o) => o._id !== deletedId);
        if (state.orderItem?._id === deletedId) {
          state.orderItem = null;
        }
      })
      .addCase(deleteOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete order item";
      });
  },
});

export const { clearError } = orderItemSlice.actions;
export default orderItemSlice.reducer;
