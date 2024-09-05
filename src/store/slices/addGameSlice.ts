/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AddGameState = {
  number: number;
};

const initialValues: AddGameState = {
  number: 0,
};

const addGameSlice = createSlice({
  name: "addGame",
  initialState: initialValues,
  reducers: {
    addGame: (state: AddGameState, action: PayloadAction<void>) => {
      state.number = state.number + 1;
    },
  },
});

export const { addGame } = addGameSlice.actions;
export const addGameSelector = (store: RootState) => store.addGameReducer;
export default addGameSlice.reducer;
