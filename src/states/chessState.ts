import { atom } from "recoil";
import { Chess } from "chess.js";

export const chessState = atom({
  key: "chessState",
  default: new Chess(),
});

export const savedPositionsState = atom<string[]>({
  key: "savedPositionsState",
  default: [],
});
