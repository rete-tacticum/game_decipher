import { test, describe, expect } from 'vitest'

import {
  LEFT_BRACKETS,
  RIGHT_BRACKETS,
  GARBAGE_CHARS
} from '../../_constants/hack'

import { isAlpha, longestStreak, getCheatInRow } from '../utils'

describe('testing isAlpha function', () => {
  test('should return true for alphabetic characters', () => {
    expect(isAlpha('a')).toBe(true)
    expect(isAlpha('A')).toBe(true)
    expect(isAlpha('z')).toBe(true)
    expect(isAlpha('Z')).toBe(true)
  })

  test('should return false for non-alpha chars', () => {
    const notAnAlpha = [...GARBAGE_CHARS, ...LEFT_BRACKETS, ...RIGHT_BRACKETS]
    notAnAlpha.forEach(char => {
      expect(isAlpha(char)).toBe(false)
    })
  })
})

describe('testing longestStreak function', () => {
  const filterFunction = symbol => symbol === 'A'
  test('should return longest streak of `A` chars', () => {
    expect(longestStreak('AAAbAAAAbAA', filterFunction)).toStrictEqual([4, 7])
    expect(longestStreak('AAAbAAAbAAA', filterFunction)).toStrictEqual([0, 2])
    expect(longestStreak('bbbbAbbbbAA', filterFunction)).toStrictEqual([9, 10])
    expect(longestStreak('bbbbbbbbbbb', filterFunction)).toStrictEqual([-1, -1])
  })
})

describe('testing getCheatInRow function', () => {
  test('should return the indices of left and right brackets in a row', () => {
    const row = 'A_[**]..DD'
    const result = getCheatInRow({ index: 2, row })
    expect(result).toStrictEqual([2, 5])
  })

  test('should return undefined if no right bracket is found after the left bracket', () => {
    const row = '##[######D' // Sample text field with only left bracket
    const result = getCheatInRow({ index: 2, row })
    expect(result).toBeUndefined() // Expecting undefined as no right bracket is found
  })

  test('should return undefined if the character at the index is not a left bracket', () => {
    const row = '!!!!_]=@D' // Sample text field with only left bracket
    const result = getCheatInRow({ index: 5, row })
    expect(result).toBeUndefined() // Expecting undefined as the character at index 2 is not a left bracket
  })

  test('should return undefined if the row contains non-alphabetic characters', () => {
    const row = 'AA[!@!BBCCDD' // Sample text field with non-alphabetic characters
    const result = getCheatInRow({ index: 2, row })
    expect(result).toBeUndefined() // Expecting undefined as there are non-alphabetic characters in the row
  })
})
