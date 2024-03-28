import generateWords from './wordgen';

import type {
  ConfigParams,
  RunningConfig,
  WordGenOptions,
} from './types'

type genParams = Omit<Required<WordGenOptions>, 'language'>;

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
]

async function generateConfig ({
  language,
  difficulty,
  tries,
  cheatChance,
  timeLimited,
}: ConfigParams): Promise<RunningConfig> {
  const params: genParams = wordGenParams[difficulty];

  const { words, password } = await generateWords({
    language,
    ...params,
  })

  return {
    words,
    password,
    cheatChance,
    difficulty,
    timeLimited,
    initialTries: tries || 4,
    cheatRestore: Math.floor(100 / difficulty),
    cheatRemove: Math.floor(60 / difficulty),
    wordCount: params.wordQuantity,
    wordLength: params.wordLength,
  }
};

export { generateConfig };