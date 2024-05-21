import React, { useEffect, useState } from "react";

import type { GameStateType } from "../../state/game/types";
import RandomizeText from "../RandomizeText";
import { useWithSound } from "../../hooks/useWithSound";

import styles from "./styles.module.scss";

const loop = new URL("/sound/loop.mp3", import.meta.url);

const HackPrompt: React.FC<{ state: GameStateType }> = ({ state }) => {
  const [text, setText] = useState<string>("");
  const [playSound, stopSound] = useWithSound(loop.href);

  useEffect(() => {
    if (state.selectedCheat !== null) {
      setText("cheat selected");
    } else if (state.selectedWord !== null) {
      setText(state.selectedWord);
    } else {
      stopSound();
      setText("");
    }
  }, [state.selectedCheat, state.selectedWord]);

  return (
    <span className={styles.prompt}>
      <RandomizeText
        value={text}
        rate={300}
        replaceWith={""}
        onStart={playSound}
        onStop={stopSound}
      />
    </span>
  );
};

export default HackPrompt;
