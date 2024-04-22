import React from 'react';
import { DecipherGameStateDispatch } from '../types'
import { SET_HOVERED } from '../../reducers/DecipherGameReducer/constants';

import styles from './styles.module.scss';

type HackCellProps = {
  uid: number;
  symbol: string;
  hovering?: boolean;
} & DecipherGameStateDispatch;

const HackCell: React.FC<HackCellProps> = ({ symbol, uid, hovering = false, dispatch }: HackCellProps) => {

  const reportHovering = (value: boolean) => {
    console.log(uid, value)
    // dispatch({ type: SET_HOVERED, payload: { value, index: uid }})
  };

  return (
    <span
      className={hovering ? styles.hover : ''}
      onMouseEnter={() => reportHovering(true)}
      onMouseLeave={() => reportHovering(false)}
    >
      {symbol}
    </span>
  );
};

export default HackCell;
