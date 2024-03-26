import type { GameStateType } from "./types";

const initialState: GameStateType = {
  textField: {},
  wordPositions: {},
  rowLabels: [],
  rowContent: [],
  hovered: [],
  log: [],
  result: null,
  triesLeft: 0,
  timeLeft: 0,
};

export { initialState };