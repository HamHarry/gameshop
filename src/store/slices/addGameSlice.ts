import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { GameItem } from "../../HomaPage/HomePage";

interface AddGameState {
  gameData?: GameItem[];
}

const initialValues: AddGameState = {};

const addGameSlice = createSlice({
  name: "addGame",
  initialState: initialValues,
  reducers: {
    setAddGame: (state: AddGameState, action: PayloadAction<GameItem>) => {
      state.gameData = action.payload;
    },
  },
});

export const { setAddGame } = addGameSlice.actions;
export const addGameSelector = (store: RootState) =>
  store.addGameReducer.gameData;
export default addGameSlice.reducer;
