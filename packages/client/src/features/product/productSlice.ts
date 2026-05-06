import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types";
import { getAllProducts, getSingleProduct, addProduct, updateProduct, deleteProduct } from "./productThunks";

export interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllProducts
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.products || [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch products";
      })
      // getSingleProduct
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data.product || null;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch product";
      })
      // addProduct
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.product) {
          state.products.push(action.payload.data.product);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add product";
      })
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.data.product;
        if (updatedProduct) {
          state.product = updatedProduct;
          const index = state.products.findIndex((p) => p._id === updatedProduct._id);
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update product";
      })
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.products = state.products.filter((p) => p._id !== deletedId);
        if (state.product?._id === deletedId) {
          state.product = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete product";
      });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
