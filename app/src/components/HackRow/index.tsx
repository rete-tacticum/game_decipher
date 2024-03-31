import React, { useRef, useEffect } from 'react';

import { nanoid } from 'nanoid';

import HackCell from '../HackCell';

import styles from './styles.module.scss';

interface HackRowProps {
  hash: string;
  symbols: string[];
}

const HackRow: React.FC<HackRowProps> = ({ hash, symbols }: HackRowProps) => {
  const range = useRef<string[]>([]);

  useEffect(() => {
    if (symbols[0]) {
      range.current = [symbols[0][0], symbols[symbols.length - 1][0]];
    }
  }, [symbols]);

  return (
    <div className={styles.container}>
      <span className={styles.label}>${hash}</span>
      <span className={styles.content}>
        {symbols.map((item) => <HackCell key={nanoid()} symbol={item}/>)}
      </span>
    </div>
  );
}

export default HackRow;
