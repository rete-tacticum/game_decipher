import React from 'react';

import styles from './styles.module.scss';

interface HackCellProps {
  symbol: string;
  hovering?: boolean;
}

const HackCell: React.FC<HackCellProps> = ({ symbol, hovering = false }: HackCellProps) => {

  const reportHovering = (value: boolean) => console.log(symbol, value);

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
