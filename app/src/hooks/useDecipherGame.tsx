import { useState, useEffect, useReducer } from "react";
import { generateConfig } from "../logic/config";
import { generateWords } from '../logic/wordgen';

import type { RunningConfig, ConfigParams } from "../logic/types";

import decipherGameReducer from '../reducers/DecipherGameReducer';
import { PREPARE_STATE } from "../reducers/DecipherGameReducer/constants";

/**
 * useDecipherGame is a custom hook for managing the Decipher game config and state.
 */
const useDecipherGame = ({
  language = 'eng',
  tries = 4,
  timeout = 0,
  difficulty = 2,
}: ConfigParams) => {
  const [error, setError] = useState<Error | null>(null);
  const [config, setConfig] = useState<RunningConfig | null>(null);
  const [gameState, dispatch] = useReducer(decipherGameReducer, null);

  useEffect(() => {
    async function configure() {
      try {
        const conf = await generateConfig(
          generateWords,
          {
            language,
            difficulty,
            tries,
            timeout,
          }
        );
        setConfig(conf);
      } catch (err) {
        setError(err as Error);
      }
    }
    configure();
  }, [language, difficulty, tries, timeout]);

  useEffect(() => {
    if (config) {
      dispatch({
        type: PREPARE_STATE,
        payload: { config: config },
      });
    }
  }, [config]);

  return {
    dispatch,
    gameState,
    error,
  };
};

export default useDecipherGame;