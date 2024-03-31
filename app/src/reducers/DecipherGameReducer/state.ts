import type { GameStateType } from "./types";

const initialState: GameStateType = {
  textField: [],
  wordPositions: {},
  rowLabels: [],
  hovered: [],
  log: [],
  result: null,
  triesLeft: 0,
  timeLeft: 0,
};


const createInitialState = ({ tries, timeout }: { tries: number, timeout?: number}): GameStateType => {
  return { ...initialState, triesLeft: tries, timeLeft: timeout};
}

export { initialState, createInitialState };