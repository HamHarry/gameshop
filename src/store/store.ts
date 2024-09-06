import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";

const reducer = {
  userReducer,
  gameReducer,
  appReducer,
  authReducer,
};

export const store = configureStore({
  reducer,
  devTools: true,
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
