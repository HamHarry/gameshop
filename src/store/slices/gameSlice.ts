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
    setDeleteGame: (state: GameState, action: PayloadAction<GameItem>) => {
      const gameDataIndex = state.gameData.findIndex((game) => {
        return game.name === action.payload.name;
      });
      state.gameData.splice(gameDataIndex, 1);
    },
  },
});

export const { setAddGame, setDeleteGame } = GameSlice.actions;

export const addGameDataSelector = (store: RootState) =>
  store.gameReducer.gameData;
export const deleteGameDataSelector = (store: RootState) =>
  store.gameReducer.gameData;

export default GameSlice.reducer;
