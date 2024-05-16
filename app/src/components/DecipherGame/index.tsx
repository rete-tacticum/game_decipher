import { useEffect } from 'react';
import useDecipherGame from '../../hooks/useDecipherGame';
import type { ConfigParams } from '../../logic/types';
import HackField from '../HackField';

import { ThemeProvider } from '../../state/theme';
import type { ThemeType } from '../../state/theme';


const DecipherGame = ({
  language,
  timeout,
  difficulty,
  tries,
  theme,
}: ConfigParams & { theme: ThemeType }) => {
  const { gameState, dispatch, error } = useDecipherGame({
    difficulty,
    language,
    timeout,
    tries,
  });


  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (gameState?.result) {
      console.debug('game finished with result: ', gameState.result);
      const eventName = gameState.result ? 'game-win' : 'game-fail';
      const event = new Event(eventName);
      window.dispatchEvent(event);
    }
  }, [gameState])

  const setCSSVariables = (theme: ThemeType) => {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value as keyof ThemeType]);
    }
  };

  useEffect(() => {
    setCSSVariables(theme);
  }, [theme]);

  if (!gameState) {
    return <p>...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <HackField
        // @ts-expect-error
        state={gameState}
        dispatch={dispatch}
      />
    </ThemeProvider>
  );
};

export default DecipherGame;