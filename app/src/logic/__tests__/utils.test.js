import { test, describe, expect } from 'vitest';

import {
  LEFT_BRACKETS,
  RIGHT_BRACKETS,
  GARBAGE_CHARS
} from '../../_constants/hack';

import {
  isAlpha,
  longestStreak,
  getCheatInRow,
  getWordExactBySymbolIndex,
  getWordRangeBySymbolIndex
} from '../utils';

describe('testing isAlpha function', () => {
  test('should return true for alphabetic characters', () => {
    expect(isAlpha('a')).toBe(true);
    expect(isAlpha('A')).toBe(true);
    expect(isAlpha('z')).toBe(true);
    expect(isAlpha('Z')).toBe(true);
  });

  test('should return false for non-alpha chars', () => {
    const notAnAlpha = [...GARBAGE_CHARS, ...LEFT_BRACKETS, ...RIGHT_BRACKETS];
    notAnAlpha.forEach(char => {
      expect(isAlpha(char)).toBe(false);
    });
  });
});

describe('testing longestStreak function', () => {
  const filterFunction = symbol => symbol === 'A';
  test('should return longest streak of `A` chars', () => {
    expect(longestStreak('AAAbAAAAbAA', filterFunction)).toStrictEqual([4, 7]);
    expect(longestStreak('AAAbAAAbAAA', filterFunction)).toStrictEqual([0, 2]);
    expect(longestStreak('bbbbAbbbbAA', filterFunction)).toStrictEqual([9, 10]);
    expect(longestStreak('bbbbbbbbbbb', filterFunction)).toStrictEqual([-1, -1]);
  });
});

describe('testing cheat extraction function', () => {
  test('should return the indices of left and right brackets in a row', () => {
    const row = 'A_[**]..DD';
    const result = getCheatInRow({ index: 2, row });
    expect(result).toStrictEqual([2, 5]);
  });

  test('should return undefined if no right bracket is found after the left bracket', () => {
    const row = '##[######D'; // Sample text field with only left bracket
    const result = getCheatInRow({ index: 2, row });
    expect(result).toBeUndefined(); // Expecting undefined as no right bracket is found
  });

  test('should return undefined if the character at the index is not a left bracket', () => {
    const row = '!!!!_]=@D'; // Sample text field with only left bracket
    const result = getCheatInRow({ index: 5, row });
    expect(result).toBeUndefined(); // Expecting undefined as the character at index 2 is not a left bracket
  });

  test('should return undefined if the row contains non-alphabetic characters', () => {
    const row = 'AA[!@!BBCCDD'; // Sample text field with non-alphabetic characters
    const result = getCheatInRow({ index: 2, row });
    expect(result).toBeUndefined(); // Expecting undefined as there are non-alphabetic characters in the row
  });
});

describe('testing word extraction functions', () => {
  const wordPositions = {
    word1: [0, 4],
    word2: [5, 9],
    word3: [10, 14]
  };

  test('getWordExactBySymbolIndex - returns correct word for symbol index within a word', () => {
    expect(getWordExactBySymbolIndex({ symbolIdx: 2, wordPositions })).toBe(
      'word1'
    );
    expect(getWordExactBySymbolIndex({ symbolIdx: 7, wordPositions })).toBe(
      'word2'
    );
    expect(getWordExactBySymbolIndex({ symbolIdx: 12, wordPositions })).toBe(
      'word3'
    );
  });

  test('getWordExactBySymbolIndex - returns undefined for symbol index outside any word', () => {
    expect(
      getWordExactBySymbolIndex({ symbolIdx: 15, wordPositions })
    ).toBeUndefined();
    expect(
      getWordExactBySymbolIndex({ symbolIdx: -1, wordPositions })
    ).toBeUndefined();
  });

  test('getWordRangeBySymbolIndex - returns correct range for symbol index within a word', () => {
    expect(
      getWordRangeBySymbolIndex({ symbolIdx: 2, wordPositions })
    ).toStrictEqual([0, 4]);
    expect(
      getWordRangeBySymbolIndex({ symbolIdx: 7, wordPositions })
    ).toStrictEqual([5, 9]);
    expect(
      getWordRangeBySymbolIndex({ symbolIdx: 12, wordPositions })
    ).toStrictEqual([10, 14]);
  });

  test('getWordRangeBySymbolIndex - returns undefined for symbol index outside any word', () => {
    expect(
      getWordRangeBySymbolIndex({ symbolIdx: 15, wordPositions })
    ).toBeUndefined();
    expect(
      getWordRangeBySymbolIndex({ symbolIdx: -1, wordPositions })
    ).toBeUndefined();
  });
});
