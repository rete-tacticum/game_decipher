import type { RunningConfig } from "../../logic/types";

type ActionType = {
  type: string;
  payload: any;
};

type GameStateType = {
  config: RunningConfig;
  textField: string[];
  wordPositions: Record<string, number[]>;
  cheatsPositions: number[][];
  selectedCheat: number | null;
  selectedWord: string | null;
  rowLabels: string[];
  hovered: Set<number>;
  log: string[];
  triesLeft: number;
  result: string;
  timeLeft?: number;
};

type ResetActionProps = {
  tries: number;
  timeout: number;
}

type SetHoveredActionProps = {
  index: string | number;
}

export type {
  ActionType,
  GameStateType,
  ResetActionProps,
  SetHoveredActionProps,
};