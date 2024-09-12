/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Layout/Navbar/Navbar";
import { RootState } from "../store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface UserState {
  userData?: User;
}

const initialState: UserState = {};

const userSlice = createSlice({
  initialState: initialState,
  name: "userSlice",
  reducers: {
    setUserData: (state: UserState, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
  },
});

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (): Promise<any> => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const response = await axios.get(
        `${import.meta.env.BASE_SERVICE_URL}/user/profile/${decodedToken.sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  }
);

export const { setUserData } = userSlice.actions;
export const UserDataSelector = (store: RootState): User | undefined =>
  store.userReducer.userData;
export default userSlice.reducer;
