import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginForm } from "../../LoginPage/LoginPage";
import axios from "axios";
import { SignupForm } from "../../SignupPage/SignupPage";

const authSlice = createSlice({
  name: "loginSlice",
  initialState: {},
  reducers: {},
});

export const login = createAsyncThunk("login", async (payload: LoginForm) => {
  const response = await axios.post(
    `${import.meta.env.BASE_SERVICE_URL}/auth/login`,
    payload
  );
  return response;
});

export const signup = createAsyncThunk(
  "signup",
  async (payload: SignupForm) => {
    const response = await axios.post(
      `${import.meta.env.BASE_SERVICE_URL}/user/register`,
      payload
    );
    return response;
  }
);

export default authSlice.reducer;
