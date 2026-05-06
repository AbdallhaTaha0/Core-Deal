import { createSlice } from "@reduxjs/toolkit";
import type { Cart } from "../../types";
import { getAllCarts, getSingleCart, addCart, updateCart, deleteCart } from "./cartThunks";

export interface CartState {
  carts: Cart[];
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  carts: [],
  cart: null,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllCarts
      .addCase(getAllCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.data.carts || [];
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch carts";
      })
      // getSingleCart
      .addCase(getSingleCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data.cart || null;
      })
      .addCase(getSingleCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })
      // addCart
      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.cart) {
          state.carts.push(action.payload.data.cart);
        }
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add cart";
      })
      // updateCart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCart = action.payload.data.cart;
        if (updatedCart) {
          state.cart = updatedCart;
          const index = state.carts.findIndex((c) => c._id === updatedCart._id);
          if (index !== -1) {
            state.carts[index] = updatedCart;
          }
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart";
      })
      // deleteCart
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.carts = state.carts.filter((c) => c._id !== deletedId);
        if (state.cart?._id === deletedId) {
          state.cart = null;
        }
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete cart";
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
