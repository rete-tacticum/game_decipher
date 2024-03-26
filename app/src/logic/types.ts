type FieldSizePermitted = 12 | 16;
type VocabularyLang = 'eng' | 'latin' | 'ru_lat';
type VocabularyWordLen = 6 | 8 | 10 | 12;
type WordQuantity = 12 | 16;
type DifficultyType = 1 | 2 | 3 | 4;

type ConfigParams = {
  language: VocabularyLang;
  difficulty: DifficultyType;
  tries: number;
  cheatChance: number;
}

type RunningConfig = {
  words: string[];
  password: string;
  initialTries: number;
  difficulty: DifficultyType;
  cheatChance: number;
  cheatRestore: number;
  cheatRemove: number;
  wordCount: number;
  wordLength: number;
  leftOpposites: Record<string, string>;
  rightOpposites: Record<string, string>;
  cheats: string[];
}

type WordGenOptions = {
  language: VocabularyLang;
  wordQuantity?: WordQuantity;
  wordLength?: VocabularyWordLen;
}

type WordGenResult = {
  words: string[];
  password: string;
}

type TextGenResult = {
  words: Record<string, number[]>;
  field: string[];
}

export type {
  VocabularyWordLen,
  WordGenOptions,
  WordGenResult,
  TextGenResult,
  FieldSizePermitted,
  DifficultyType,
  VocabularyLang,
  ConfigParams,
  RunningConfig
};
