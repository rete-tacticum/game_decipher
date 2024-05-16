/*
  This module generates word list from provided vocabulary
*/

import { getRandomFromArray } from './helpers';
import type {
  WordGenOptions,
  WordGenResult
} from './types';

function compare(target: string, source: string): number {
  let count = 0;
  for (let i = 0; i < target.length; i++) {
    if (target[i] === source[i]) {
      count++;
    }
  }
  return count;
}

async function generateWords(
    vocabulary: string[],
    { language, wordQuantity = 16, wordLength = 8 }: WordGenOptions
  ): Promise<WordGenResult> {
  if (wordLength < 6 || wordLength > 12) {
    throw new Error('word length not in range 6 - 12');
  }

  if (language === 'latin' && wordLength > 10) {
    wordLength = 10;
  }

  const password = getRandomFromArray(vocabulary);
  const wordsSelected: string[] = [password];

  const wordsMax: string[] = [];
  const wordsZero: string[] = [];
  const wordsOther: string[] = [];
  let wordDelta = 2;

  while (wordsMax.length === 0) {
    for (const word of vocabulary) {
      if (word !== password) {
        const c = compare(word, password);
        if (c === 0) {
          wordsZero.push(word);
        } else if (c === wordLength - 1 || c === wordLength - wordDelta) {
          wordsMax.push(word);
        } else {
          wordsOther.push(word);
        }
      }
    }
    wordDelta++;
  }

  if (wordsMax.length > 0) {
    wordsSelected.push(wordsMax[Math.floor(Math.random() * wordsMax.length)]);
  }

  if (wordsZero.length > 0) {
    wordsSelected.push(wordsZero[Math.floor(Math.random() * wordsZero.length)]);
  }

  let i = 0;
  while (i < wordQuantity - 3) {
    const word = wordsOther[Math.floor(Math.random() * wordsOther.length)];
    if (!wordsSelected.includes(word)) {
      wordsSelected.push(word);
      i++;
    }
  }

  return {
    words: wordsSelected.sort(() => Math.random() - 0.5),
    password: password,
    wordLength,
  };
}

export { generateWords };
