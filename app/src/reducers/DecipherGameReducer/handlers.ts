import type { GameStateType } from "./types";
import type { RunningConfig } from "../../logic/types";

import {
  getCheatInRow,
  getRowBySymbolIndex,
  getWordRangeBySymbolIndex,
} from '../../logic/utils';

import { getRange } from '../../helpers';

import { initialState } from "./state";
import {
  RESET_STATE,
  PREPARE_STATE,
  SET_HOVERED,
  RESET_HOVERED,
  SET_TEXTFIELD,
} from "./constants";

import { createTextField, createRowHexLabels } from '../../logic/textfield';

const actionHandlers = {
  [RESET_STATE]: (state: GameStateType): GameStateType => {
    state = { ...initialState };
    return state;
  },
  [PREPARE_STATE]: (
    state: GameStateType,
    config: RunningConfig,
  ): GameStateType => {
    const textfield = createTextField(config);
    state.textField = textfield.field;
    state.wordPositions = textfield.words;
    state.rowLabels = createRowHexLabels();
    return state;
  },
  [SET_HOVERED]: (
    state: GameStateType,
    { index }: { index: number }
  ): GameStateType => {
    // checking if this a word to highlight all of its symbols
    const wordRange = getWordRangeBySymbolIndex({
      symbolIdx: index,
      wordPositions: state.wordPositions,
      isRange: true
    })
    if (wordRange) {
      state = { ...state, hovered: getRange(wordRange[0], wordRange[1]) };
      return state;
    }

    // checking if this a cheat to highlight both brackets
    const row = getRowBySymbolIndex({ index });
    if (!row) throw new Error('symbol index out of range, possible text field generation error');
    const cheatRange = getCheatInRow({
      index,
      symbol: state.textField[index],
      textField: state.textField,
    })
    if (cheatRange) {
      state = { ...state, hovered: cheatRange };
      return state;
    }
    // or returning just one hovered symbol
    state = {...state, hovered: [index]};
    return state
  },
  [RESET_HOVERED]: (state: GameStateType): GameStateType => {
    state = {...state, hovered: []};
    return state;
  },
  [SET_TEXTFIELD]: (
    state: GameStateType,
    { textField }: { textField: string[] }
  ): GameStateType => {
    state = {...state, textField };
    return state;
  },
};

export default actionHandlers;
