import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { GameItem } from "../../HomaPage/HomePage";

export interface GameState {
  gameData: GameItem[];
  summary: {
    price: number;
    vat: number;
    total: number;
  };
  gamelibary: GameItem[];
}

const initialState: GameState = {
  gameData: [],
  summary: {
    price: 0,
    vat: 0,
    total: 0,
  },
  gamelibary: [],
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
    setClaerGame: (state: GameState) => {
      state.gameData = initialState.gameData;
    },

    setSammary: (state: GameState) => {
      const sum = state.gameData.reduce((prev, item) => {
        return prev + item.price;
      }, 0);
      state.summary.price = sum;
      const vat = sum * 0.07;
      state.summary.vat = vat;
      const total = sum + vat;
      state.summary.total = total;
    },

    setAddGameLibary: (state: GameState) => {
      state.gameData.map((game) => {
        state.gamelibary.push(game);
      });
    },
    setOutsideGame: (state: GameState, action: PayloadAction<GameItem>) => {
      state.gamelibary.push(action.payload);
    },
  },
});

export const {
  setAddGame,
  setDeleteGame,
  setSammary,
  setAddGameLibary,
  setClaerGame,
  setOutsideGame,
} = GameSlice.actions;

export const addGameDataSelector = (store: RootState) =>
  store.gameReducer.gameData;
export const deleteGameDataSelector = (store: RootState) =>
  store.gameReducer.gameData;
export const clearGameDataSelector = (store: RootState) =>
  store.gameReducer.gameData;

export const summaryGameSelector = (store: RootState) =>
  store.gameReducer.summary;

export const gameLibarySelector = (store: RootState) =>
  store.gameReducer.gamelibary;

export default GameSlice.reducer;
