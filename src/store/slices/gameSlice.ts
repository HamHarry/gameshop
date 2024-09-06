import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { GameItem } from "../../HomaPage/HomePage";

interface GameState {
  gameData: GameItem[];
}

const initialState: GameState = {
  gameData: [],
};

const GameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    setAddGame: (state: GameState, action: PayloadAction<GameItem>) => {
      state.gameData.push(action.payload);
    },
  },
});

export const { setAddGame } = GameSlice.actions;

export const gameDataSelector = (store: RootState) =>
  store.gameReducer.gameData;

export default GameSlice.reducer;
