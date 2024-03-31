type ActionType = {
  type: string;
  payload: any;
};

type GameStateType = {
  textField: string[];
  wordPositions: Record<string, number[]>;
  rowLabels: string[];
  hovered: number[];
  log: string[];
  triesLeft: number;
  result: boolean | null;
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