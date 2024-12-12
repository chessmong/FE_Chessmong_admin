import { atom } from "recoil";

export const positionsState = atom<string[]>({
  key: "positionsState",
  default: [],
});
