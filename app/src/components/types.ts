import { ActionType, GameStateType } from '../state/game/types';

type DecipherGameStateDispatch = {
  state: GameStateType;
  dispatch: (action: ActionType) => void;
}

export type {
  DecipherGameStateDispatch,
}