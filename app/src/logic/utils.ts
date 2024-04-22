import { 
  LEFT_BRACKETS, 
  RIGHT_BRACKETS, 
  GARBAGE_CHARS, 
  CHEATS_OPPOSITE, 
  ROW_COUNT, 
  ROW_LENGTH 
} from '../_constants/hack';

import { GetVocabParams, WordRangeOptions } from './types';

const NOT_AN_ALPHA = [ ...GARBAGE_CHARS, ...RIGHT_BRACKETS, ...LEFT_BRACKETS ];
const isAlpha = (symbol: string) => !NOT_AN_ALPHA.includes(symbol);
const notIsAlpha = (symbol: string) => !isAlpha(symbol);

function longestStreak<T>(
  input: T[],
  filterFunction: (item: T) => boolean
): [number, number] {
  let maxLength = 0;
  let startIdx = -1;
  let endIdx = -1;
  let currentLength = 0;
  let currentStartIdx = -1;

  for (let i = 0; i < input.length; i++) {
    if (filterFunction(input[i])) {
      if (currentStartIdx === -1) {
        currentStartIdx = i;
      }
      currentLength++;
    } else {
      if (currentLength > maxLength) {
        maxLength = currentLength;
        startIdx = currentStartIdx;
        endIdx = i - 1;
      }
      currentLength = 0;
      currentStartIdx = -1;
    }
  }

  if (currentLength > maxLength) {
    maxLength = currentLength;
    startIdx = currentStartIdx;
    endIdx = input.length - 1;
  }

  return [startIdx, endIdx];
}

const getWordExactBySymbolIndex = ({ symbolIdx, wordPositions }: WordRangeOptions): string | undefined => {
  const index = Object.values(wordPositions).findIndex((item) => symbolIdx >= item[0] && symbolIdx <= item[1]);
  if (index < 0) return;
  return Object.keys(wordPositions)[index];
};

const getWordRangeBySymbolIndex = ({ symbolIdx, wordPositions }: WordRangeOptions): number[] | undefined => {
  const index = Object.values(wordPositions).findIndex((item) => symbolIdx >= item[0] && symbolIdx <= item[1]);
  if (index < 0) return;
  return Object.values(wordPositions)[index];
};

type CheatInRowOptions = {
  index: number;
  row: string[];
}

const getCheatInRow = ({ index, row }: CheatInRowOptions): number[] | undefined => {
  const symbol = row[index];
  if (!LEFT_BRACKETS.includes(symbol)) return;
  const rowSlice = row.slice(index);
  if (rowSlice.length > 1) {
    const opposite = rowSlice.indexOf(CHEATS_OPPOSITE[symbol]);
    if (opposite > 0) return [index, index + opposite];
  }
};

const getRowBySymbolIndex = ({ index }: { index: number }): number => {
  const symbolsCount = ROW_COUNT * ROW_LENGTH;
  return Math.floor(symbolsCount / index);
};

async function getVocabularyFromJSON(
  { language, wordLength }: GetVocabParams
): Promise<string[]> {
  const vocabulary = await import(`../_constants/vocab/${language}/${wordLength}.json`);
  return vocabulary.default || [];
}

export {
  isAlpha,
  notIsAlpha,
  longestStreak,
  getCheatInRow,
  getRowBySymbolIndex,
  getWordExactBySymbolIndex,
  getWordRangeBySymbolIndex,
  getVocabularyFromJSON,
};