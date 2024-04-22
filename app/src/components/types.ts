import { ActionType, GameStateType } from '../reducers/DecipherGameReducer/types';

type DecipherGameStateDispatch = {
  state: GameStateType;
  dispatch: (action: ActionType) => void;
}

export type {
  DecipherGameStateDispatch,
}