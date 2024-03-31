import { useState, useEffect } from 'react';
import useDecipherGame from '../../hooks/useDecipherGame';
import type { ConfigParams } from '../../logic/types';
import HackField from '../HackField';

import styles from './styles.module.scss';

const DecipherGame = ({
  language,
  timeout,
  difficulty,
  tries,
}: ConfigParams) => {
  const { gameState, dispatch, error } = useDecipherGame({
    difficulty,
    language,
    timeout,
    tries,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error])

  if (!gameState) {
    return <p>Loading...</p>
  }

  return (
    <>
      <HackField
        // @ts-ignore
        state={gameState}
        dispatch={dispatch}
      />
    </>
  );
}

export default DecipherGame;