import type {
  DifficultyType,
  VocabularyLang,
  RunningConfig
} from '../logic/types'

import React, { useState, useEffect } from 'react';

import { generateConfig } from '../logic/config'
import { createTextField, createRowHexLabels } from '../logic/textfield';

import HackField from '../components/HackField';

/**
 * DecipherGameContainer is a container component for the Decipher game.
 * It manages the game's configuration and state.
 */
type DecipherGameContainerProps = {
  /**
   * The language for the game vocabulary. Can be 'eng', 'latin', or 'ru_lat'.
   * @default 'eng'
   */
  language?: VocabularyLang;
  /**
   * The number of tries allowed for each guess in the game.
   * @default 4
   */
  tries?: number;
  /**
   * The timeout duration for each round in seconds.
   * @default 0
   */
  timeout?: number;
  /**
   * The difficulty level of the game. Can be 1, 2, 3, or 4.
   * @default 2
   */
  difficulty?: DifficultyType;
  /**
   * Possibility that cheat bracket would be generated instead of garbage symbol.
   * @default 50
   */
  cheatChance?: number;
};

/**
 * DecipherGameContainer is a container component for the Decipher game.
 * It manages the game's configuration and state.
 */
const DecipherGameContainer: React.FC<DecipherGameContainerProps> = ({
  language = 'eng',
  tries = 4,
  timeout = 0,
  difficulty = 2,
  cheatChance = 50
}) => {

  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(timeout);
  const [triesLeft, setTriesLeft] = useState<number>(tries);

  // text field utility states
  const [init, setInit] = useState<boolean>(false);
  const [config, setConfig] = useState<RunningConfig | null>(null);
  const [rowLabels, setRowLabels] = useState<string[]>([]);
  const [wordPositions, setWordPositions] = useState<Record<string, number[]>>({});
  const [textField, setTextField] = useState<string[]>([]);

  const initializeGame = () => {
    if (!config) throw new Error('decipher game config missing');
    const textGen = createTextField(config);

    setTextField(textGen.field);
    setWordPositions(textGen.words);
    setRowLabels(createRowHexLabels());
  };

  useEffect(() => {
    async function configure() {
      const conf = await generateConfig({ language, difficulty, tries, cheatChance });
      setConfig(conf);
    }
    configure();
  }, []);

  useEffect(() => {
    if (config && !init) {
      initializeGame();
      setInit(true);
    }
  }, [config, init]);

  return (
    <>
      <HackField
        rowLabels={rowLabels}
        textField={textField}
        wordPositions={wordPositions}
      />
    </>
  );
};

export default DecipherGameContainer;
