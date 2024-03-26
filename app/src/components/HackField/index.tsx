import React, { useState, useEffect } from 'react';
import { getChunks } from '../../helpers';

import HackRow from '../HackRow';

import { ROW_LENGTH  } from '../../_constants/hack';

import styles from './styles.module.scss';

interface HackFieldProps {
  rowLabels: string[];
  textField: Record<number, string>;
  wordPositions: Record<string, number[]>;
}

const HackField: React.FC<HackFieldProps> = ({
  textField,
  rowLabels,
  wordPositions,
}) => {

  const [rowContent, setRowContent] = useState<Record<number, string>[][]>([[]]);

  useEffect(() => {
    setRowContent(getChunks(Object.entries(textField), ROW_LENGTH));
  }, [textField])

  const getColumnTemplate = (content: Record<number, string>[][]) => {
    return (
      content.map((item, index) => 
        <HackRow
          key={index}
          hash={rowLabels[index]}
          symbols={item}
        />)
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {getColumnTemplate(rowContent.slice(0, Math.floor(rowLabels.length / 2)))}
      </div>
      <div className={styles.column}>
        {getColumnTemplate(rowContent.slice(Math.floor(rowLabels.length / 2)))}
      </div>
    </div>
  );
}


export default HackField;