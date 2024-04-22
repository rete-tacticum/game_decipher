import React, { useState, useEffect } from 'react';
import { getChunks } from '../../logic/helpers';
import { DecipherGameStateDispatch } from '../types';

import HackRow from '../HackRow';

import { ROW_LENGTH  } from '../../_constants/hack';

import styles from './styles.module.scss';

// @ts-ignore
const HackField: React.FC = ({ state, dispatch }: DecipherGameStateDispatch) => {

  const [rows, setRows] = useState<string[][]>([[]]);

  useEffect(() => {
    setRows(getChunks(state.textField, ROW_LENGTH));
  }, [state]);

  const getColumnTemplate = (content: string[][], count: number) => {
    const overhead = count * (rows.length / 2);
    return (
      <> 
        {
          content.map((item, index) =>
            <HackRow
              key={index + overhead}
              order={index + overhead}
              hash={state.rowLabels[index + overhead]}
              symbols={item}
              state={state}
              dispatch={dispatch}
            />)
        }
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {getColumnTemplate(rows.slice(0, Math.floor(state.rowLabels.length / 2)), 0)}
      </div>
      <div className={styles.column}>
        {getColumnTemplate(rows.slice(Math.floor(state.rowLabels.length / 2)), 1)}
      </div>
    </div>
  );
};


export default HackField;