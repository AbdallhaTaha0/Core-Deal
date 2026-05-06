import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types";
import { getAllUsers, getSingleUser, addUser, updateUser, deleteUser } from "./userThunks";

export interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch users";
      })
      // getSingleUser
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user || null;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch user";
      })
      // addUser
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.user) {
          state.users.push(action.payload.data.user);
        }
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add user";
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data.user;
        if (updatedUser) {
          state.user = updatedUser;
          const index = state.users.findIndex((u) => u._id === updatedUser._id);
          if (index !== -1) {
            state.users[index] = updatedUser;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update user";
      })
      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.users = state.users.filter((u) => u._id !== deletedId);
        if (state.user?._id === deletedId) {
          state.user = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete user";
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
