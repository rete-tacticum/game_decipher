import { LEFT_BRACKETS, CHEATS_OPPOSITE, ROW_COUNT, ROW_LENGTH } from '../_constants/hack'

type WordRangeProps = {
  symbolIdx: number;
  wordPositions: Record<string, number[]>;
  isRange: boolean;
}

const getWordExactBySymbolIndex = ({ symbolIdx, wordPositions }: WordRangeProps): string | undefined => {
  const index = Object.values(wordPositions).findIndex((item) => symbolIdx >= item[0] && symbolIdx <= item[1]);
  if (!index) return;
  return Object.keys(wordPositions)[index];
}

const getWordRangeBySymbolIndex = ({ symbolIdx, wordPositions }: WordRangeProps): number[] | undefined => {
  const index = Object.values(wordPositions).findIndex((item) => symbolIdx >= item[0] && symbolIdx <= item[1]);
  if (!index) return;
  return Object.values(wordPositions)[index];
}

type CheatInRowProps = {
  index: number;
  symbol: typeof LEFT_BRACKETS[number];
  rowContent: [number, string];
}

const getCheatInRow = ({ symbol, index, rowContent }: CheatInRowProps): number[] | undefined => {
  if (!LEFT_BRACKETS.includes(symbol)) return;
  const opposite = CHEATS_OPPOSITE[symbol];
  const hasCheat = rowContent.slice(index).reduce<number | null>((accum, item, index) => {
    if (item[1] === opposite) accum = index;
    return accum;
  }, null)
  if (hasCheat) return [index, hasCheat];
}

const getRowBySymbolIndex = ({ index }): number | null => {
  const symbolsCount = ROW_COUNT * ROW_LENGTH;
  if (index < 0 || index > symbolsCount) return null;
  return Math.floor(symbolsCount / index);
}

export {
  getCheatInRow,
  getRowBySymbolIndex,
  getWordExactBySymbolIndex,
  getWordRangeBySymbolIndex,
}