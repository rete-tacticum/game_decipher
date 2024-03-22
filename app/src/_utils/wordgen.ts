/*
  This module generates word list from provided vocabulary
*/

import { getRandomFromArray } from './helpers';

type vocabularyLang = 'eng' | 'latin' | 'ru_lat';
type vocabularyWordLen = 6 | 8 | 10 | 12;
type wordQuantity = 8 | 16;

interface WordGenOptions {
  language: vocabularyLang;
  wordQuantity?: wordQuantity;
  wordLength?: vocabularyWordLen;
}

function compare(target: string, source: string): number {
  let count = 0;
  for (let i = 0; i < target.length; i++) {
    if (target[i] === source[i]) {
      count++;
    }
  }
  return count;
}

async function getVocabulary(
  { language, wordLength }: { language: vocabularyLang, wordLength: vocabularyWordLen }
): Promise<string[]> {
  if (wordLength < 6 || wordLength > 12) {
    throw new Error('word length not in range 6 - 12');
  }

  if (language === 'latin' && wordLength > 10) {
    console.error('latin vocabulary for more than 10 chars unavailable, using 10 char words');
    wordLength = 10;
  }

  try {
    const vocabulary = await import(`../_constants/vocabularies/${language}/${wordLength}.json`);
    return vocabulary;
  } catch (error) {
    throw error;
  }
}

async function generateWords({ language, wordQuantity = 16, wordLength = 8 }: WordGenOptions): Promise<string[]> {
  const vocabulary = await getVocabulary({language, wordLength});
  const password = getRandomFromArray(vocabulary);
  const wordsSelected: string[] = [password];

  let wordsMax: string[] = [];
  let wordsZero: string[] = [];
  let wordsOther: string[] = [];
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

  return wordsSelected.sort(() => Math.random() - 0.5);
}

export { generateWords };
export default generateWords;
