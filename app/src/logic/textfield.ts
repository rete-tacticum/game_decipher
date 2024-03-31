import type { RunningConfig, TextGenResult } from "./types";

import {
  getRandomInt,
  getRandomFromArray,
  getChunks,
  getRange,
} from './helpers';

import {
  GARBAGE_CHARS,
  LEFT_BRACKETS,
  CHEATS_OPPOSITE,
  ROW_COUNT,
  ROW_LENGTH,
} from '../_constants/hack'

import { notIsAlpha, longestStreak } from './utils';

const createRowHexLabels = (): string[] => {
  const startIndex = getRandomInt(0x1000, 0xFFFF-513);
  const emptyArray = Array(ROW_COUNT).fill(0);

  return emptyArray.map((_i, index, _a) => {
    const number = index === 0 ? startIndex : startIndex + 16 * index;
    return `0x${number.toString(16).toUpperCase()}`;
  })
}

const placeCheatInRow = (row: string[]): [boolean, string[]] => {
  const [start, end] = longestStreak(row, notIsAlpha);
  if (start !== end && start > 0 && start < end) {
    const randStart = getRandomFromArray(getRange(start, end - 1));
    const randEnd = getRandomFromArray(getRange(randStart + 1, end));
    const startChar = getRandomFromArray(LEFT_BRACKETS);
    row[randStart] = startChar;
    row[randEnd] = CHEATS_OPPOSITE[startChar];
    return [true, row];
  } else {
    return [false, row];
  }
}

const placeCheats = (config: RunningConfig, textfield: string[]): string[] => {
  // cheats spawn rates could and should be fine-tuned
  const numberOfCheats = config.difficulty < 2
    ? getRandomFromArray(config.cheatParams.lowDifficultyCount)
    : getRandomFromArray(config.cheatParams.highDifficultyCount);

  const percentModifier = 10;
  const distributionRate = Math.floor(ROW_COUNT / numberOfCheats);
  // getting groups of rows as a result
  const rows = getChunks(textfield, ROW_LENGTH)
  const rowGroups = getChunks(rows, distributionRate);

  let cheatsPlaced = 0;

  const result = rowGroups.map((rowGroup, index) => {
    // setting chance of spawn of working cheat inside group of rows
    let shouldSpawn = false;
    let hasCheatInChunk = false;
    return rowGroup.map((row) => {
      if (hasCheatInChunk) return row;
      if (!shouldSpawn) {
        if ((index * ROW_LENGTH) % distributionRate === 0) {
          shouldSpawn = true;
        } else {
          const chanceMod = (Math.floor(100 / rowGroup.length) * index) + percentModifier
          shouldSpawn = getRandomFromArray([0, 100]) <= chanceMod;
        }
      }
      if (cheatsPlaced >= numberOfCheats) shouldSpawn = false;
      if (shouldSpawn) {
        const result = placeCheatInRow(row);
        if (result[0]) {
          shouldSpawn = false;
          hasCheatInChunk = true;
          cheatsPlaced++;
        }
        return result[1];
      }
      return row;
    });
  })
  return result.flat(2);
}

const createTextField = (config: RunningConfig): TextGenResult => {
  const result: string[] = [];
  const wordPositions: Record<string, number[]> = {};

  let words: string[] = [...config.words]

  const totalSymbolsCount = ROW_COUNT * ROW_LENGTH;
  const fieldSize = totalSymbolsCount - (config.wordCount * config.wordLength)
  const wordDistributionRate = Math.ceil(fieldSize / config.wordCount - 1);

  let wordSpawnChance = 0;
  let wordSpawnedInChunk = false;

  for (let i = 0; i < fieldSize + config.wordCount; i++) {
    if (i % wordDistributionRate === 0) wordSpawnedInChunk = false;

    if (!wordSpawnedInChunk) {
      if (i + 1 % wordDistributionRate === 0) {
        wordSpawnChance = 100;
      } else {
        wordSpawnChance = 20;
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
    result.push(getRandomFromArray(GARBAGE_CHARS));
  }

  return {
    field: placeCheats(config, result.join('').split('')),
    words: wordPositions,
  }
}

export {
  createTextField,
  createRowHexLabels
}