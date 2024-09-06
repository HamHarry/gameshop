import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AppState {
  errorMessage?: string;
}

const initialState: AppState = {};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    clearErrorMessage: (state: AppState) => {
      state.errorMessage = initialState.errorMessage;
    },
    setErrorMessage: (state: AppState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { clearErrorMessage, setErrorMessage } = appSlice.actions;

export const errorMessageSelector = (store: RootState) =>
  store.appReducer.errorMessage;

export default appSlice.reducer;
