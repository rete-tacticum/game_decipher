import type {
  DifficultyType,
  VocabularyLang,
  RunningConfig
} from "../logic/types";
import type { GameStateType } from '../reducers/DecipherGameReducer/types'

import React, { useState, useEffect } from "react";

import { generateConfig } from "../logic/config";

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
  // text field utility states
  const [init, setInit] = useState<boolean>(false);
  const [config, setConfig] = useState<RunningConfig>();
  const [gameState, setGameState] = useState<GameStateType>();

  const initializeGame = () => {
    if (!config) throw new Error('decipher game config missing');
  };

  useEffect(() => {
    async function configure() {
      const conf = await generateConfig({
        language,
        difficulty,
        tries,
        cheatChance,
        timeLimited: timeout,
      });
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
