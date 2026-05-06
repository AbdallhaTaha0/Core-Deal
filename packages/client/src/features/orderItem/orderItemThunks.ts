import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { OrderItem } from "../../types";

type OrderItemResponse = {
  success: boolean;
  message: string;
  data: {
    orderItem?: OrderItem;
    orderItems?: OrderItem[];
  };
};

export const getAllOrderItems = createAsyncThunk<OrderItemResponse, void, { rejectValue: any }>("orderItem/getAllOrderItems", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/orderItems");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const getSingleOrderItem = createAsyncThunk<OrderItemResponse, string, { rejectValue: any }>("orderItem/getSingleOrderItem", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/orderItems/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const addOrderItem = createAsyncThunk<OrderItemResponse, Partial<OrderItem>, { rejectValue: any }>("orderItem/addOrderItem", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/orderItems", data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const updateOrderItem = createAsyncThunk<OrderItemResponse, { id: string; data: Partial<OrderItem> }, { rejectValue: any }>("orderItem/updateOrderItem", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/orderItems/${id}`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const deleteOrderItem = createAsyncThunk<OrderItemResponse, string, { rejectValue: any }>("orderItem/deleteOrderItem", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/orderItems/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
