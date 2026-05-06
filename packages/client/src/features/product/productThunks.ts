import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { Product } from "../../types";

type ProductResponse = {
  success: boolean;
  message: string;
  data: {
    product?: Product;
    products?: Product[];
  };
};

export const getAllProducts = createAsyncThunk<ProductResponse, void, { rejectValue: any }>("product/getAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/products");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const getSingleProduct = createAsyncThunk<ProductResponse, string, { rejectValue: any }>("product/getSingleProduct", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const addProduct = createAsyncThunk<ProductResponse, Partial<Product>, { rejectValue: any }>("product/addProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/products", data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const updateProduct = createAsyncThunk<ProductResponse, { id: string; data: Partial<Product> }, { rejectValue: any }>("product/updateProduct", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/products/${id}`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const deleteProduct = createAsyncThunk<ProductResponse, string, { rejectValue: any }>("product/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
