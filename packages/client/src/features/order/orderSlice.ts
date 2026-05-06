import { createSlice } from "@reduxjs/toolkit";
import type { Order } from "../../types";
import { getAllOrders, getSingleOrder, addOrder, updateOrder, deleteOrder } from "./orderThunks";

export interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllOrders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data.orders || [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      // getSingleOrder
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data.order || null;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch order";
      })
      // addOrder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.order) {
          state.orders.push(action.payload.data.order);
        }
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add order";
      })
      // updateOrder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.data.order;
        if (updatedOrder) {
          state.order = updatedOrder;
          const index = state.orders.findIndex((o) => o._id === updatedOrder._id);
          if (index !== -1) {
            state.orders[index] = updatedOrder;
          }
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update order";
      })
      // deleteOrder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.orders = state.orders.filter((o) => o._id !== deletedId);
        if (state.order?._id === deletedId) {
          state.order = null;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete order";
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
