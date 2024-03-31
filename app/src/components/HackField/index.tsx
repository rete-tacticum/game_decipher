import React, { useState, useEffect } from 'react';
import { getChunks } from '../../logic/helpers';

import HackRow from '../HackRow';

import { ROW_LENGTH  } from '../../_constants/hack';

import styles from './styles.module.scss';

// @ts-ignore
const HackField: React.FC = ({ state, dispatch }) => {

  const [rows, setRows] = useState<string[][]>([[]]);

  useEffect(() => {
    setRows(getChunks(state.textField, ROW_LENGTH));
  }, [state.textField])

  const getColumnTemplate = (content: string[][]) => {
    return (
      <> 
        {
          content.map((item, index) =>
            <HackRow
              key={index}
              hash={state.rowLabels[index]}
              symbols={item}
            />)
        }
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {getColumnTemplate(rows.slice(0, Math.floor(state.rowLabels.length / 2)))}
      </div>
      <div className={styles.column}>
        {getColumnTemplate(rows.slice(Math.floor(state.rowLabels.length / 2)))}
      </div>
    </div>
  );
}


export default HackField;