import { test, describe, expect } from "vitest";

import { LEFT_BRACKETS, RIGHT_BRACKETS, GARBAGE_CHARS } from "../../constants";

import { isAlpha, longestStreak } from "../utils";

describe("testing isAlpha function", () => {
  test("should return true for alphabetic characters", () => {
    expect(isAlpha("a")).toBe(true);
    expect(isAlpha("A")).toBe(true);
    expect(isAlpha("z")).toBe(true);
    expect(isAlpha("Z")).toBe(true);
  });

  test("should return false for non-alpha chars", () => {
    const notAnAlpha = [...GARBAGE_CHARS, ...LEFT_BRACKETS, ...RIGHT_BRACKETS];
    notAnAlpha.forEach((char) => {
      expect(isAlpha(char)).toBe(false);
    });
  });
});

describe("testing longestStreak function", () => {
  const filterFunction = (symbol) => symbol === "A";
  test("should return longest streak of `A` chars", () => {
    expect(longestStreak("AAAbAAAAbAA", filterFunction)).toStrictEqual([4, 7]);
    expect(longestStreak("AAAbAAAbAAA", filterFunction)).toStrictEqual([0, 2]);
    expect(longestStreak("bbbbAbbbbAA", filterFunction)).toStrictEqual([9, 10]);
    expect(longestStreak("bbbbbbbbbbb", filterFunction)).toStrictEqual([
      -1, -1,
    ]);
  });
});
