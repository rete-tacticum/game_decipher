import React, { useState, useEffect } from 'react';
import { DecipherGameStateDispatch } from '../types';
import { ROW_LENGTH } from '../../_constants/hack';

import HackCell from '../HackCell';

import styles from './styles.module.scss';

type HackRowProps = {
  order: number;
  hash: string;
  symbols: string[];
} & DecipherGameStateDispatch;

const HackRow: React.FC<HackRowProps> = ({ hash, order, symbols, state, dispatch }: HackRowProps) => {
  const [range, setRange] = useState<number[]>([0, ROW_LENGTH]);

  useEffect(() => {
    if (symbols.length) {
      const start = order * ROW_LENGTH;
      setRange([start, start + ROW_LENGTH - 1]);
    }
  }, [0, ROW_LENGTH]);

  return (
    <div className={styles.container}>
      <span className={styles.label}>${hash}</span>
      <span className={styles.content}>
        {symbols.map((item, index) => <HackCell
          key={index + range[0]}
          uid={index + range[0]}
          symbol={item}
          state={state}
          dispatch={dispatch}
        />)}
      </span>
    </div>
  );
};

export default HackRow;
