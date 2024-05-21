import type { GameStateType } from "./types";

const initialState: GameStateType = {
  textField: [],
  wordPositions: {},
  cheatsPositions: [],
  selectedCheat: null,
  selectedWord: null,
  rowLabels: [],
  hovered: new Set(),
  log: [],
  result: '',
  triesLeft: 0,
  timeLeft: 0,
  // @ts-ignore
  config: null,
};


const createInitialState = ({ tries, timeout }: { tries: number, timeout?: number}): GameStateType => {
  return { ...initialState, triesLeft: tries, timeLeft: timeout};
};

export { initialState, createInitialState };