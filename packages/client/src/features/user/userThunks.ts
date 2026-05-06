import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { User } from "../../types";

type UserResponse = {
  success: boolean;
  message: string;
  data: {
    user?: User;
    users?: User[];
  };
};

export const getAllUsers = createAsyncThunk<UserResponse, void, { rejectValue: any }>("user/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const getSingleUser = createAsyncThunk<UserResponse, string, { rejectValue: any }>("user/getSingleUser", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const addUser = createAsyncThunk<UserResponse, Partial<User>, { rejectValue: any }>("user/addUser", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/users", data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const updateUser = createAsyncThunk<UserResponse, { id: string; data: Partial<User> }, { rejectValue: any }>("user/updateUser", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/users/${id}`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});

export const deleteUser = createAsyncThunk<UserResponse, string, { rejectValue: any }>("user/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
