import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Layout/Navbar/Navbar";
import { RootState } from "../store";

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

export const { setUserData } = userSlice.actions;
export const UserDataSelector = (store: RootState): User | undefined =>
  store.userReducer.userData;
export default userSlice.reducer;
