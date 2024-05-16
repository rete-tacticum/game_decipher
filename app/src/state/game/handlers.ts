import type { GameStateType } from "./types";
import type { RunningConfig } from "../../logic/types";

import { convertToSet, getRandomFromArray, getRange, getIntersection } from '../../logic/helpers';

import { initialState } from "./state";
import {
  PREPARE_STATE,
  SET_HOVERED,
  RESET_HOVERED,
  ON_SELECTED,
} from "./constants";

import { createTextField, createRowHexLabels } from '../../logic/textfield';

type ItemSelected = {
  range: Set<number>;
}

type CheatSelected = {
  type: 'cheat';
  item: number;
} & ItemSelected;

type WordSelected = {
  type: 'word';
  item: string;
} & ItemSelected;

const getWordSelected = (wordPositions: Record<string, number[]>, index: number): WordSelected | null => {
  // check if this word - highlight whole word
  const wordRange = Object.entries(wordPositions).find(([_, val]) => index >= val[0] && index <= val[1]) || null;
  if (wordRange) {
    const rng = wordRange[1];
    return {
      type: 'word',
      item: wordRange[0],
      range: convertToSet(getRange(rng[0], rng[1]))
    }
  } else {
    return null;
  }
}

const getCheatSelected = (cheatsPositions: number[][], index: number): CheatSelected | null => {
  // checking if this a cheat to highlight both brackets
  const indexFound = cheatsPositions.findIndex((item) => item.includes(index));
  if (indexFound !== -1) {
    return {
      type: 'cheat',
      item: indexFound,
      range: convertToSet(cheatsPositions[indexFound])
    }
  } else {
    return null;
  }
}

const resetHovered = (state: GameStateType): GameStateType => {
  return {...state, hovered: new Set(), selectedCheat: null, selectedWord: null };
}

const replaceWithDots = (textfield: string[], indexes: Set<number>): string[] => {
  for (const index of indexes) {
    textfield[index] = '.';
  }
  return textfield;
}

const removeWord = (wordPositions: Record<string, number[]>, word: string): Record<string, number[]> => {
  return Object.entries(wordPositions).reduce((acc, [key, val]) => {
    if (key !== word) acc[key] = val;
    return acc;
  }, {} as Record<string, number[]>) 
}

const onWordApply = (state: GameStateType): GameStateType => {
  if (!state.config) return state;
  if (!(typeof(state.selectedWord) === 'string')) return state;

  let result = '';
  let triesLeft = state.triesLeft - 1;
   
  const sameChars = getIntersection(state.selectedWord.split(''), state.config.password.split(''));
  let log: string[] = [];
  if (state.config.password !== state.selectedWord) {
    log = [
      ...state.log,
      state.selectedWord,
      'ACCESS DENIED',
      `${sameChars.length}/${state.config.wordLength} CORRECT`,
      triesLeft > 0 ? `TRIES LEFT: ${triesLeft}` : `TERMINAL BLOCKED`,
    ];
    if (triesLeft <= 0) result = 'lose';
  } else {
    log = [
      ...state.log,
      state.selectedWord,
      'ACCESS GRANTED',
    ];
    result = 'win';
  }
  state = { ...state, log, result, triesLeft };
  return state;
}

const onWordSelection = (state: GameStateType): GameStateType => {
  const newWordPositions = removeWord(state.wordPositions, state.selectedWord || '');

  return {
    ...state,
    textField: replaceWithDots(state.textField, state.hovered),
    wordPositions: newWordPositions
  };
}

const onCheatApply = (state: GameStateType): GameStateType => {
  const removeChance = state.config.cheatParams.cheatRestore[state.config.difficulty];
  const restoreChance = state.config.cheatParams.cheatRemove[state.config.difficulty];

  const triesRestored = getRandomFromArray([0, 100]) < restoreChance;

  if (triesRestored) {
    state = {
      ...state,
      triesLeft: state.config.initialTries,
      log: [...state.log, 'TRIES RESTORED'],
    };
    return resetHovered(state);
  }
  
  const wordRemoved = getRandomFromArray([0, 100]) < removeChance;

  if (wordRemoved) {
    const selectedWord = getRandomFromArray(
      Object.entries(state.wordPositions).filter(
        // @ts-ignore
        ([key, _]) => key !== state.config.password
      )
    );
    state = {
      ...state,
      // @ts-ignore
      textField: replaceWithDots(state.textField, convertToSet(getRange(...selectedWord[1]))),
      wordPositions: removeWord(state.wordPositions, selectedWord[0]),
      log: [...state.log, 'DUD REMOVED'],
    }
    return resetHovered(state);
  }

  return state;
}

const onCheatSelection = (state: GameStateType): GameStateType => {
  if (state.selectedCheat === null) return state;
  const newCheatPositions = [...state.cheatsPositions];
  const currentPosition = state.cheatsPositions[state.selectedCheat];
  // @ts-ignore
  const replaceRange = convertToSet(getRange(...currentPosition));
  newCheatPositions[state.selectedCheat] = [-1, -1];
  return {
    ...state,
    cheatsPositions: newCheatPositions,
    textField: replaceWithDots(state.textField, replaceRange),
  };
}

const actionHandlers = {

  [PREPARE_STATE]: (
    state: GameStateType,
    { config }: { config: RunningConfig },
  ): GameStateType => {
    const textfield = createTextField(config);
    state = {
      ...initialState,
      config: config,
      triesLeft: config.initialTries,
      textField: textfield.field,
      wordPositions: textfield.words,
      cheatsPositions: textfield.cheats,
      rowLabels: createRowHexLabels(),
    };
    return state;
  },

  [SET_HOVERED]: (
    state: GameStateType,
    { index }: { index: number }
  ): GameStateType => {
    // checking if this a word or cheat to highlight all of its symbols
    if (state.result !== '') return state;

    const selected = getWordSelected(state.wordPositions, index) || getCheatSelected(state.cheatsPositions, index);
    if (selected) {
      if (selected.type === 'word') {
        state = { ...state, hovered: selected.range, selectedWord: selected.item };
      } else if (selected.type === 'cheat') {
        state = { ...state, hovered: selected.range, selectedCheat: selected.item };
      }
    } else {
      state = { ...state, hovered: convertToSet([index]) };
    }
    return state;
  },

  [RESET_HOVERED]: (state: GameStateType): GameStateType => {
    state = resetHovered(state);
    return state;
  },

  [ON_SELECTED]: (state: GameStateType): GameStateType => {
    if (state.result !== '') return state;
    let update: GameStateType | null = null;

    if (state.selectedWord !== null) {
      update = onWordApply(onWordSelection(state));
    } else if (state.selectedCheat !== null) {
      update = onCheatApply(onCheatSelection(state));
    } else {
      return state;
    }

    state = resetHovered({...state, ...update});
    return state;
  }
};

export default actionHandlers;
