import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./user-service";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials) => {
    console.log("login thunk: " + credentials.username);
    const user = await userService.login(credentials);
    return user;
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async (user) => {
    const status = await userService.updateUser(user);
    return status;
  }
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (credentials) => {
    const user = await userService.register(credentials);
    return user;
  }
);