import type { RunningConfig, TextGenResult, WordsPlaceResult, CheatsPlaceResult } from "./types";

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
} from '../_constants/hack';

import { notIsAlpha, longestStreak } from './utils';


const createRowHexLabels = (): string[] => {
  const startIndex = getRandomInt(0x1000, 0xFFFF-513);
  const emptyArray = Array(ROW_COUNT).fill(0);

  return emptyArray.map((_i, index, _a) => {
    const number = index === 0 ? startIndex : startIndex + 16 * index;
    return `0x${number.toString(16).toUpperCase()}`;
  });
};

const wordsPlace = (config: RunningConfig): WordsPlaceResult => {
  const result: string[] = [];
  const wordPositions: Record<string, number[]> = {};

  const words: string[] = [...config.words];

  const totalSymbolsCount = ROW_COUNT * ROW_LENGTH;
  const fieldSize = totalSymbolsCount - (config.wordCount * config.wordLength);
  const wordDistributionRate = Math.ceil(fieldSize / config.wordCount - 1);

  let wordsSpawned = 0;
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
          const overhead = (config.wordLength - 1) * wordsSpawned;
          wordPositions[word] = [i + overhead, i + overhead + config.wordLength - 1];
          wordSpawnedInChunk = true;
          wordsSpawned++;
          continue;
        }
      }
    }
    result.push(getRandomFromArray(GARBAGE_CHARS));
  }
  return {
    textfield: result.join('').split(''),
    wordsPos: wordPositions,
  }
}

const placeCheatInRow = (row: string[]): [boolean, string[], number[]] => {
  const [start, end] = longestStreak(row, notIsAlpha);
  if (start !== end && start > 0 && start < end) {
    const randStart = getRandomFromArray(getRange(start, end - 1));
    const randEnd = getRandomFromArray(getRange(randStart + 1, end));
    const startChar = getRandomFromArray(LEFT_BRACKETS);
    row[randStart] = startChar;
    row[randEnd] = CHEATS_OPPOSITE[startChar];
    return [true, row, [randStart, randEnd]];
  } else {
    return [false, row, []];
  }
};

const cheatsPlace = (config: RunningConfig, textfield: string[]): CheatsPlaceResult => {
  // cheats spawn rates could and should be fine-tuned
  const numberOfCheats = config.difficulty < 2
    ? getRandomFromArray(config.cheatParams.lowDifficultyCount)
    : getRandomFromArray(config.cheatParams.highDifficultyCount);

  const percentModifier = 10;
  const distributionRate = Math.floor(ROW_COUNT / numberOfCheats);
  // getting groups of rows as a result
  const rows = getChunks(textfield, ROW_LENGTH);
  const rowGroups = getChunks(rows, distributionRate);
  const cheatRanges: number[][] = [];

  const result = rowGroups.map((rowGroup, groupIndex) => {
    // setting chance of spawn of working cheat inside group of rows
    let shouldSpawn = false;
    let hasCheatInChunk = false;
    return rowGroup.map((row, rowIndex) => {
      if (hasCheatInChunk) return row;
      if (!shouldSpawn) {
        if ((groupIndex * ROW_LENGTH) % distributionRate === 0) {
          shouldSpawn = true;
        } else {
          const chanceMod = (Math.floor(100 / rowGroup.length) * groupIndex) + percentModifier;
          shouldSpawn = getRandomFromArray([0, 100]) <= chanceMod;
        }
      }
      if (cheatRanges.length > numberOfCheats) shouldSpawn = false;
      if (shouldSpawn) {
        const [result, symbols, cheatRange] = placeCheatInRow(row);
        if (result) {
          shouldSpawn = false;
          hasCheatInChunk = true;
          if (cheatRange.length > 0) {
            const rowIndexMod = groupIndex > 0 ? (groupIndex * distributionRate) + rowIndex : rowIndex;
            const cheatIndexMod = rowIndexMod * ROW_LENGTH;
            cheatRanges.push(cheatRange.map(i => i + cheatIndexMod));
          }
        }
        return symbols;
      }
      return row;
    });
  });
  return {
    textfield: result.flat(2),
    cheatsPos: cheatRanges,
  };
};

const createTextField = (config: RunningConfig): TextGenResult => {
  const wordsPlaced = wordsPlace(config);
  const withCheatsPlaced = cheatsPlace(config, wordsPlaced.textfield);

  return {
    field: withCheatsPlaced.textfield,
    words: wordsPlaced.wordsPos,
    cheats: withCheatsPlaced.cheatsPos,
  };
};

export {
  createTextField,
  createRowHexLabels
};