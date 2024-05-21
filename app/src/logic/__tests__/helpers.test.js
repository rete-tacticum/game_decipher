import { test, describe, expect } from "vitest";
import { getRange, getChunks } from "../helpers";

describe("testing getRange function", () => {
  test("returns empty array if end is less than start", () => {
    expect(getRange(5, 3)).toStrictEqual([]);
    expect(getRange(-5, -10)).toStrictEqual([]);
  });

  test("returns array of two equal numbers if start equals end", () => {
    expect(getRange(7, 7)).toStrictEqual([7, 7]);
  });

  test("returns array of consecutive numbers from start to end", () => {
    expect(getRange(3, 7)).toStrictEqual([3, 4, 5, 6, 7]);
    expect(getRange(0, 5)).toStrictEqual([0, 1, 2, 3, 4, 5]);
  });

  test("ignores any negative numbers", () => {
    expect(getRange(-2, 2)).toStrictEqual([]);
    expect(getRange(-3, 0)).toStrictEqual([]);
    expect(getRange(-5, -1)).toStrictEqual([]);
  });
});

describe("testing getChunks function", () => {
  test("returns empty chunks for empty array", () => {
    const arr = [];
    const size = 2;
    const chunks = getChunks(arr, size);
    expect(chunks).toEqual([]);
  });

  test("chunks an array of numbers into specified size", () => {
    const arr = [1, 2, 3, 4, 5];
    const size = 2;
    const expected = [[1, 2], [3, 4], [5]];
    const chunks = getChunks(arr, size);
    expect(chunks).toEqual(expected);
  });

  test("chunks an array of strings with uneven size", () => {
    const arr = ["a", "b", "c", "d"];
    const size = 3;
    const expected = [["a", "b", "c"], ["d"]];
    const chunks = getChunks(arr, size);
    expect(chunks).toEqual(expected);
  });

  test("handles chunks larger than array size", () => {
    const arr = [1, 2, 3];
    const size = 10;
    const chunks = getChunks(arr, size);
    expect(chunks).toEqual([arr]);
  });
});
