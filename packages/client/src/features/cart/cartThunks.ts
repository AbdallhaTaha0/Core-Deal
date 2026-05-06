import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { Cart } from "../../types";

type CartResponse = {
  success: boolean;
  message: string;
  data: {
    cart?: Cart;
    carts?: Cart[];
  };
};

export const getAllCarts = createAsyncThunk<CartResponse, void, { rejectValue: any }>("cart/getAllCarts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/carts");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const getSingleCart = createAsyncThunk<CartResponse, string, { rejectValue: any }>("cart/getSingleCart", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/carts/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const addCart = createAsyncThunk<CartResponse, Partial<Cart>, { rejectValue: any }>("cart/addCart", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/carts", data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const updateCart = createAsyncThunk<CartResponse, { id: string; data: Partial<Cart> }, { rejectValue: any }>("cart/updateCart", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/carts/${id}`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const deleteCart = createAsyncThunk<CartResponse, string, { rejectValue: any }>("cart/deleteCart", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/carts/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
