import type { RunningConfig, TextGenResult } from "./types";

import {
  getRandomInt,
  getRandomFromArray,
} from '../helpers';

import {
  GARBAGE_CHARS,
  LEFT_BRACKETS,
  RIGHT_BRACKETS,
  ROW_COUNT,
  ROW_LENGTH,
} from '../_constants/hack'

const createRowHexLabels = (): string[] => {
  const startIndex = getRandomInt(0x1000, 0xFFFF-513);
  const emptyArray = Array(ROW_COUNT).fill(0);

  return emptyArray.map((_i, index, _a) => {
    const number = index === 0 ? startIndex : startIndex + 16 * index;
    return `0x${number.toString(16).toUpperCase()}`;
  })
}

const createTextField = (config: RunningConfig): TextGenResult => {
  const result: string[] = [];
  const wordPositions: Record<string, number[]> = {};

  let words: string[] = [...config.words]

  const totalSymbolsCount = ROW_COUNT * ROW_LENGTH;
  const fieldSize = totalSymbolsCount - (config.wordCount * config.wordLength)
  const wordDistributionRate = Math.floor(fieldSize / config.wordCount - 1);
 
  let hasCheatActiveAt = 0;
  let wordSpawnChance = 0;
  let wordSpawnedInChunk = false;

  for (let i = 0; i < fieldSize + config.wordCount; i++) {
    if (i % wordDistributionRate === 0) wordSpawnedInChunk = false;
    if (!wordSpawnedInChunk) {
      if (i + 1 % wordDistributionRate === 0) {
        wordSpawnChance = 100;
      } else {
        wordSpawnChance = 33;
      }

      if (getRandomInt(1, 100) <= wordSpawnChance) {
        const word = words.pop();
        if (word) {
          result.push(word);
          wordPositions[word] = [i, i + config.wordLength];
          wordSpawnedInChunk = true;
          continue;
        }
      }
    }

    if (getRandomInt(0, 100) <= Math.floor(config.cheatChance / config.difficulty)) {
      if (hasCheatActiveAt === 0) {
        result.push(getRandomFromArray(LEFT_BRACKETS));
        hasCheatActiveAt = i;
      } else {
        result.push(getRandomFromArray(RIGHT_BRACKETS));
        hasCheatActiveAt = 0;
      }
    } else {
      result.push(getRandomFromArray(GARBAGE_CHARS));
    }
  }

  return {
    field: result.join('').split(''),
    words: wordPositions,
  }
}

export {
  createTextField,
  createRowHexLabels
}