import { useEffect } from "react";
import useDecipherGame from "../hooks/useDecipherGame";
import type { ConfigParams } from "../logic/types";
import HackField from "./HackField";
import { ThemeType } from "./types";
import "../assets/main.scss";

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

  const basicTheme = {
    colorPrimary: "rgba(139, 255, 184, 0.85)",
    colorAccent: "rgba(20,20,40)",
    fontPrimary: "VT220",
    baseSize: "1.15rem",
    highlightColor: "rgba(255,255,255,0.25)",
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (gameState?.result) {
      console.debug("game finished with result: ", gameState.result);
      const eventName = gameState.result ? "game-win" : "game-fail";
      const event = new Event(eventName);
      window.dispatchEvent(event);
    }
  }, [gameState]);

  const setCSSVariables = (theme: ThemeType) => {
    for (const value in theme) {
      document.documentElement.style.setProperty(
        `--${value}`,
        theme[value as keyof ThemeType]
      );
    }
  };

  useEffect(() => {
    setCSSVariables(basicTheme);
  }, []);

  if (!gameState) {
    return <p>...</p>;
  }

  return (
    <HackField
      // @ts-expect-error
      state={gameState}
      dispatch={dispatch}
    />
  );
};

export default DecipherGame;
