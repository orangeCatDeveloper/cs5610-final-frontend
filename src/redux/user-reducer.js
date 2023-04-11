import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  registerThunk,
  updateUserThunk,
} from "../services/user-thunks";

const initialState = {
  currentUser: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
  extraReducers: {
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
    [registerThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export default userSlice.reducer;
export const { updateCurrentUser } = userSlice.actions;
