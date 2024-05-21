const GARBAGE_CHARS = ["~", "@", "#", "$", "%", "^", "&", "*", "_", "+", "-", "=", "?", "|", ".", ",", "!"];
const LEFT_BRACKETS = ["(", "[", "{"];
const RIGHT_BRACKETS = [")", "]", "}"];
const ROW_COUNT = 32;
const ROW_LENGTH = 12;

const CHEATS_OPPOSITE = LEFT_BRACKETS.reduce((accum, item, index) => {
  accum[item] = RIGHT_BRACKETS[index];
  return accum;
}, {} as Record<string, string>);

export {
  GARBAGE_CHARS,
  LEFT_BRACKETS,
  RIGHT_BRACKETS,
  CHEATS_OPPOSITE,
  ROW_COUNT,
  ROW_LENGTH,
};