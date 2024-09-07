/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { GameItem } from "../../HomaPage/HomePage";

interface GameState {
  gameData: GameItem[];
  summary: {
    price: number;
    vat: number;
    total: number;
  };
}

const initialState: GameState = {
  gameData: [],
  summary: {
    price: 0,
    vat: 0,
    total: 0,
  },
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
    setIncrease: (state: GameState) => {
      const sum = state.gameData.reduce((prev, item) => {
        return prev + item.price;
      }, 0);
      state.summary.price = sum;
      const vat = sum * 0.07;
      state.summary.vat = vat;
      const total = sum + vat;
      state.summary.total = total;
    },
    setDecrease: (state: GameState) => {
      const sum = state.gameData.reduce((prev, item) => {
        return item.price - prev;
      }, 0);
      state.summary.price = sum;
      const vat = sum * 0.07;
      state.summary.vat = vat;
      const total = sum + vat;
      state.summary.total = total;
    },
  },
});

export const { setAddGame, setDeleteGame, setIncrease, setDecrease } =
  GameSlice.actions;

export const addGameDataSelector = (store: RootState) =>
  store.gameReducer.gameData;
export const deleteGameDataSelector = (store: RootState) =>
  store.gameReducer.gameData;
export const increaseGameSelector = (store: RootState) =>
  store.gameReducer.summary;
export const decreaseGameSelector = (store: RootState) =>
  store.gameReducer.summary;

export default GameSlice.reducer;
