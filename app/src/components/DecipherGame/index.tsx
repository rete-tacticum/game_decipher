import { useEffect } from 'react';
import useDecipherGame from '../../hooks/useDecipherGame';
import type { ConfigParams } from '../../logic/types';
import HackField from '../HackField';

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
  }, [error]);

  if (!gameState) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HackField
        // @ts-expect-error
        state={gameState}
        dispatch={dispatch}
      />
    </>
  );
};

export default DecipherGame;