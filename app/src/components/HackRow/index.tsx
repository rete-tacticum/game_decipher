import React, { useState, useEffect } from "react";

import { DecipherGameStateDispatch } from "../types";
import { ROW_LENGTH } from "../../constants";
import {
  RESET_HOVERED,
  SET_HOVERED,
  ON_SELECTED,
} from "../../state/game/constants";
import { convertToSet, isSetsOverlap, getRange } from "../../logic/helpers";
import { useWithSound } from "../../hooks/useWithSound";

import RandomizeText from "../RandomizeText";

import styles from "./styles.module.scss";

const touch = new URL("/sound/touch.mp3", import.meta.url);

type HackRowProps = {
  order: number;
  hash: string;
  symbols: string[];
} & DecipherGameStateDispatch;

const HackRow: React.FC<HackRowProps> = ({
  hash,
  order,
  symbols,
  state,
  dispatch,
}: HackRowProps) => {
  const rangeStart: number = order * ROW_LENGTH;
  const emptySet: Set<number> = new Set();
  const cellRange: number[] = [rangeStart, rangeStart + ROW_LENGTH - 1];
  const cellRangeSet: Set<number> = convertToSet(
    getRange(cellRange[0], cellRange[1])
  );

  const [hoveredCells, setHoveredCells] = useState<Set<number>>(emptySet);

  const [playSelectSound] = useWithSound(touch.href);

  useEffect(() => {
    if (isSetsOverlap(cellRangeSet, state.hovered)) {
      setHoveredCells(state.hovered);
    } else {
      setHoveredCells(emptySet);
    }
  }, [state.hovered]);

  const reportCellHover = (idx: number, value: boolean) => {
    if (value) {
      dispatch({ type: SET_HOVERED, payload: { index: idx } });
    } else {
      dispatch({ type: RESET_HOVERED, payload: {} });
    }
  };

  const reportCellSelect = () => {
    if (state.result === "") {
      playSelectSound();
      dispatch({ type: ON_SELECTED, payload: {} });
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>
        <RandomizeText value={hash} predelay={10 * order} rate={200} />
      </span>
      <span className={styles.content}>
        {symbols.map((item, index) => {
          const uid = index + cellRange[0];
          return (
            <span
              key={uid}
              className={hoveredCells.has(uid) ? styles.hovered : ""}
              onMouseEnter={() => reportCellHover(uid, true)}
              onMouseLeave={() => reportCellHover(uid, false)}
              onMouseDown={reportCellSelect}
            >
              <RandomizeText
                key={item}
                value={item}
                rate={20}
                predelay={1 * uid}
              />
            </span>
          );
        })}
      </span>
    </div>
  );
};

export default HackRow;
