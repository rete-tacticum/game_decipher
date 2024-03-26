type GameStateType = {
  textField: Record<number, string>;
  wordPositions: Record<string, number[]>;
  rowLabels: string[];
  rowContent: [string, string][];
  hovered: number[];
  log: string[];
  triesLeft: number;
  timeLeft: number;
  result: boolean | null;
};

type ResetActionProps = {
  tries: number;
  timeout: number;
}

type SetHoveredActionProps = {
  index: string | number;
}

export type {
  GameStateType,
  ResetActionProps,
  SetHoveredActionProps,
};