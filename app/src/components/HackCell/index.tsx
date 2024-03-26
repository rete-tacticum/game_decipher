import React from 'react';

import styles from './styles.module.scss';

interface HackCellProps {
  index: number;
  symbol: string;
  hovering?: boolean;
}

const HackCell: React.FC<HackCellProps> = ({ index, symbol, hovering = false }: HackCellProps) => {

  const reportHovering = (value: boolean) => console.log(index);

  return (
    <span
      className={hovering ? styles.hover : ''}
      onMouseEnter={() => reportHovering(true)}
      onMouseLeave={() => reportHovering(false)}
    >
      {symbol}
    </span>
  );
}

export default HackCell;
