import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types';
import { login, register, logout, getMe, updateMe } from './authThunks';

export interface AuthState{
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState ={
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError:(state)=>{
      state.error = null;
    }
  },
  extraReducers: ( builder ) => {
    builder
      .addCase(login.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) =>{
        state.loading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(register.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) =>{
        state.loading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload?.message || "Register failed";
      })
      .addCase(logout.fulfilled, (state, action) =>{
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getMe.pending, (state) =>{
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) =>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state, action) =>{
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updateMe.fulfilled, (state, action) =>{
        state.user = action.payload.data.user;
      })
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;