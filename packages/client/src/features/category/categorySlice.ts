import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../types";
import { getAllCategories, getSingleCategory, addCategory, updateCategory, deleteCategory } from "./categoryThunks";

export interface CategoryState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllCategories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data.categories || [];
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch categories";
      })
      // getSingleCategory
      .addCase(getSingleCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data.category || null;
      })
      .addCase(getSingleCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch category";
      })
      // addCategory
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.category) {
          state.categories.push(action.payload.data.category);
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add category";
      })
      // updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload.data.category;
        if (updatedCategory) {
          state.category = updatedCategory;
          const index = state.categories.findIndex((c) => c._id === updatedCategory._id);
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update category";
      })
      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.categories = state.categories.filter((c) => c._id !== deletedId);
        if (state.category?._id === deletedId) {
          state.category = null;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete category";
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
