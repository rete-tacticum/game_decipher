import { getRange } from './helpers';
import { getVocabularyFromJSON } from './utils';

import type {
  CheatParams,
  ConfigParams,
  GetVocabParams,
  RunningConfig,
  WordGenOptions,
  WordGenResult,
} from './types';

type genParams = Omit<Required<WordGenOptions>, 'language'>;

// balancing cheats
const cheatParams: CheatParams = {
  lowDifficultyCount: getRange(4, 7),
  highDifficultyCount: getRange(6, 8),
  cheatRestore: [100, 80, 60, 50], // difficulty from 0 to 3
  cheatRemove: [75, 66, 50, 33], // difficulty from 0 to 3
};

const wordGenParams: genParams[] = [
  {
    wordQuantity: 16,
    wordLength: 6,
  },
  {
    wordQuantity: 16,
    wordLength: 8,
  },
  {
    wordQuantity: 12,
    wordLength: 10,
  },
  {
    wordQuantity: 12,
    wordLength: 12,
  },
];

async function generateConfig (
  generateWords: (vocabulary: string[], params: WordGenOptions) => Promise<WordGenResult>,
  {
    language,
    difficulty,
    tries,
    timeout,
  }: ConfigParams
): Promise<RunningConfig> {
  if (difficulty > wordGenParams.length - 1) {
    throw new Error(`difficulty should be in range 0 - ${wordGenParams.length - 1}`);
  }
  const params: genParams = wordGenParams[difficulty];
  
  const vocabulary = await getVocabularyFromJSON({
    language,
    wordLength: params.wordLength,
  });

  const { words, password, wordLength } = await generateWords(
    vocabulary,
    {
      language,
      ...params,
    }
  );

  return {
    words,
    password,
    difficulty,
    cheatParams,
    wordLength,
    timeLimited: timeout > 0 ? timeout : undefined,
    initialTries: tries || 4,
    wordCount: params.wordQuantity,
  };
};

export { generateConfig, wordGenParams };