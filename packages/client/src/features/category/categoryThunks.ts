import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { Category } from "../../types";

type CategoryResponse = {
  success: boolean;
  message: string;
  data: {
    category?: Category;
    categories?: Category[];
  };
};

export const getAllCategories = createAsyncThunk<CategoryResponse, void, { rejectValue: any }>("category/getAllCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/categories");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const getSingleCategory = createAsyncThunk<CategoryResponse, string, { rejectValue: any }>("category/getSingleCategory", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/categories/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const addCategory = createAsyncThunk<CategoryResponse, Partial<Category>, { rejectValue: any }>("category/addCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/categories", data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const updateCategory = createAsyncThunk<CategoryResponse, { id: string; data: Partial<Category> }, { rejectValue: any }>("category/updateCategory", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/categories/${id}`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const deleteCategory = createAsyncThunk<CategoryResponse, string, { rejectValue: any }>("category/deleteCategory", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/categories/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
