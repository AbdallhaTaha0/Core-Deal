import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { Order } from "../../types";

type OrderResponse = {
  success: boolean;
  message: string;
  data: {
    order?: Order;
    orders?: Order[];
  };
};

export const getAllOrders = createAsyncThunk<OrderResponse, void, { rejectValue: any }>("order/getAllOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/orders");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const getSingleOrder = createAsyncThunk<OrderResponse, string, { rejectValue: any }>("order/getSingleOrder", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const addOrder = createAsyncThunk<OrderResponse, Partial<Order>, { rejectValue: any }>("order/addOrder", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/orders", data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const updateOrder = createAsyncThunk<OrderResponse, { id: string; data: Partial<Order> }, { rejectValue: any }>("order/updateOrder", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/orders/${id}`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const deleteOrder = createAsyncThunk<OrderResponse, string, { rejectValue: any }>("order/deleteOrder", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/orders/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
