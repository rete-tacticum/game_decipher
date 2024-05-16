function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRange(start: number, end: number): number[] {
  if (end < start || end < 0 || start < 0) return [];
  if (start === end) return [start, end];
  return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
}

function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFromArray<T>(items: T[]): T {
  if (items.length === 0) throw new Error('Cannot get random from empty array');
  return items[Math.floor(Math.random() * items.length)];
}

function getIntersection<T>(arrA: T[], arrB: T[]): T[] {
  const setA = new Set(arrA);
  return arrB.filter(x => setA.has(x));
}

function getChunks<T>(arr: T[], size: number): T[][] {
  return arr.reduce((accum: T[][], item: T, index: number) => {
    const chunkIdx = Math.floor(index/size);
    if (!accum[chunkIdx]) {
      accum[chunkIdx] = [];
    }
    accum[chunkIdx].push(item);
    return accum;
  }, []);
}

function mergeArraysToObject<T extends string | number | symbol>(arrA: T[], arrB: T[]): Record<T, T> {
  return Object.fromEntries(arrA.map((_, i) => [arrA[i], arrB[i]])) as Record<T, T>;
}

const convertToSet = (arr: number[]): Set<number> => {
  if (!arr || arr.length < 1) return new Set();
  try {
    return new Set(arr.sort((a, b) => a - b));
  } catch {
    return new Set();
  }
}

function isSetsOverlap<T>(set1: Set<T>, set2: Set<T>): boolean {
  const sortedSets = set1.size > set2.size ? [set1, set2] : [set2, set1];
  const overlap = new Set<T>([...sortedSets[1]].filter(x => sortedSets[0].has(x)));
  return overlap.size > 0;
}

export {
  shuffle,
  getRange,
  getRandomInt,
  getRandomFromArray,
  getIntersection,
  getChunks,
  isSetsOverlap,
  convertToSet,
  mergeArraysToObject
};
