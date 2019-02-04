import * as React from 'react';

import { Dot, Wrapper } from './Loading.css';

export interface Props {
  count?: number;
  size?: number;
}

export const defaultProps = {
  count: 3,
  size: 30,
};

const renderDots = (count: number) => {
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    dots.push(<Dot count={count} index={i} key={i} />);
  }

  return dots;
};

const Loading = ({ count = defaultProps.count, size = defaultProps.size }: Props) => <Wrapper size={size}>{renderDots(count)}</Wrapper>;

export default Loading;
