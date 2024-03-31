import type { GameStateType } from "./types";
import type { RunningConfig } from "../../logic/types";

import {
  ROW_LENGTH,
  ROW_COUNT
} from '../../_constants/hack';

import {
  getCheatInRow,
  getRowBySymbolIndex,
  getWordRangeBySymbolIndex,
} from '../../logic/utils';

import { getRange } from '../../logic/helpers';

import { initialState } from "./state";
import {
  PREPARE_STATE,
  SET_HOVERED,
  RESET_HOVERED,
} from "./constants";

import { createTextField, createRowHexLabels } from '../../logic/textfield';

const actionHandlers = {
  [PREPARE_STATE]: (
    state: GameStateType,
    { config }: { config: RunningConfig },
  ): GameStateType => {
    const textfield = createTextField(config);
    state = {
      ...initialState,
      textField: textfield.field,
      wordPositions: textfield.words,
      rowLabels: createRowHexLabels(),
    }
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

    const rowContent = state.textField.slice(ROW_COUNT * row, ROW_COUNT * row + ROW_LENGTH);

    const cheatRange = getCheatInRow({
      index: index % ROW_LENGTH,
      row: rowContent,
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
};

export default actionHandlers;
