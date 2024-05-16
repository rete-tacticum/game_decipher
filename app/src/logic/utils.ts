import { 
  LEFT_BRACKETS, 
  RIGHT_BRACKETS, 
  GARBAGE_CHARS, 
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
  getVocabularyFromJSON,
};