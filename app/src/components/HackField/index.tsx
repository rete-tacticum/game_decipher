import React, { useState, useEffect } from "react";

import { getChunks } from "../../logic/helpers";
import { DecipherGameStateDispatch } from "../types";
import { useWithSound } from "../../hooks/useWithSound";

import HackRow from "../HackRow";
import HackPrompt from "../HackPrompt";

import { ROW_LENGTH } from "../../constants";

import styles from "./styles.module.scss";

const soundError = new URL("/sound/error.mp3", import.meta.url);

// @ts-ignore
const HackField: React.FC = ({
  state,
  dispatch,
}: DecipherGameStateDispatch) => {
  const [rows, setRows] = useState<string[][]>([[]]);
  const [playSoundFail] = useWithSound(soundError.href);

  useEffect(() => {
    setRows(getChunks(state.textField, ROW_LENGTH));
  }, [state.textField, state.hovered]);

  useEffect(() => {
    if (state.result === "lose") {
      playSoundFail();
    }
  }, [state.result]);

  const getColumnTemplate = (content: string[][], count: number) => {
    const overhead = count * (rows.length / 2);
    return (
      <>
        {content.map((item, index) => (
          <HackRow
            key={index + overhead}
            order={index + overhead}
            hash={state.rowLabels[index + overhead]}
            symbols={item}
            state={state}
            dispatch={dispatch}
          />
        ))}
      </>
    );
  };

  return (
    <div className={styles.hackGame}>
      <div className={styles.triesContainer}>
        <span>TRIES LEFT:</span>
        <span>
          {Array.from(Array(state.triesLeft)).map((_, idx) => (
            <span key={idx} className={styles.block}>
              #
            </span>
          ))}
        </span>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.column}>
          {getColumnTemplate(
            rows.slice(0, Math.floor(state.rowLabels.length / 2)),
            0
          )}
        </div>
        <div className={styles.column}>
          {getColumnTemplate(
            rows.slice(Math.floor(state.rowLabels.length / 2)),
            1
          )}
        </div>
        <div className={styles.logContainer}>
          <div className={styles.log}>
            <div className={styles.records}>
              {state.log.map((record, idx) => (
                <span key={idx} className={styles.record}>
                  {record}
                </span>
              ))}
            </div>
            <span className={styles.prompt}>
              <HackPrompt state={state} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackField;
