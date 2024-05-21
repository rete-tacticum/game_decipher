import { ActionType, GameStateType } from '../state/game/types';

type DecipherGameStateDispatch = {
  state: GameStateType;
  dispatch: (action: ActionType) => void;
}

type ThemeType = {
  colorPrimary: string;
  colorAccent: string;
  fontPrimary: string;
  baseSize: string;
  highlightColor: string;
};


export type {
  ThemeType,
  DecipherGameStateDispatch,
}