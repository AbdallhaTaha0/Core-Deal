import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { LoginData, RegisterData, User } from "@/types";


type AuthResponse = {
  success: boolean;
  message: string,
  data: {
    user: User,
  };
};


export const login = createAsyncThunk<AuthResponse, LoginData, { rejectValue: any }>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
export const register = createAsyncThunk<AuthResponse, RegisterData, { rejectValue: any }>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/signup", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
export const logout = createAsyncThunk<{message: string}, any, { rejectValue: any }>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
export const getMe = createAsyncThunk<User, any, { rejectValue: any }>("auth/getMe", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data);
  }
});
export const updateMe = createAsyncThunk<AuthResponse, Partial<User>, { rejectValue: any }>(
  "auth/updateMe",
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await api.patch("/me", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
