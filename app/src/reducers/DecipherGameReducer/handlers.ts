import type { GameStateType, ResetActionProps } from "./types";

import {
  getCheatInRow,
  getRowBySymbolIndex,
  getWordRangeBySymbolIndex,
} from '../../logic/utils';

import { getRange } from '../../helpers';

import { initialState } from "./state";
import {
  RESET_STATE,
  SET_HOVERED,
  RESET_HOVERED,
  SET_TEXTFIELD,
} from "./constants";

const actionHandlers = {
  [RESET_STATE]: ({ tries, timeout }: ResetActionProps): GameStateType => {
    return { ...initialState, timeLeft: timeout, triesLeft: tries };
  },
  [SET_HOVERED]: (state: GameStateType, { index }): GameStateType => {
    // checking if this a word to highlight all of its symbols
    const wordRange = getWordRangeBySymbolIndex({
      symbolIdx: index,
      wordPositions: state.wordPositions,
      isRange: true
    })
    if (wordRange) return { ...state, hovered: getRange(wordRange[0], wordRange[1]) };

    // checking if this a cheat to highlight both brackets
    const row = getRowBySymbolIndex({ index });
    if (!row) throw new Error('symbol index out of range, possible text field generation error');
    const cheatRange = getCheatInRow({
      index,
      symbol: state.textField[index],
      rowContent: state.rowContent[row],
    })
    if (cheatRange) return { ...state, hovered: cheatRange }
    // or returning just one hovered symbol
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
