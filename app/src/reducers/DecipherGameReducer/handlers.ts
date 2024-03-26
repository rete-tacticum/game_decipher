import type { GameStateType, ResetActionProps } from ./types

import { initialState } from ./state;
import {
  RESET_STATE,
  SET_HOVERED,
  RESET_HOVERED,
  SET_TEXTFIELD,
} from ./constants

const actionHandlers = {
  [RESET_STATE]: ({ tries, timeout }: ResetActionProps): GameStateType => {
    return { ...initialState, timeLeft: timeout, triesLeft: tries };
  },
  [SET_HOVERED]: (state: GameStateType, { index }): GameStateType => {
    return {...state, hovered: [index]};
  },
  [RESET_HOVERED]: (state: GameStateType): GameStateType => {
    return {...state, hovered: []};
  },
  [SET_TEXTFIELD]: (state: GameStateType, { textField }): GameStateType => {
    return {...state, textField };
  }
};

export default actionHandlers;
