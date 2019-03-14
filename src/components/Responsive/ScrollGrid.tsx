import * as React from 'react';

import { GridWrapper, ScrollWrapper } from './Responsive.css';

interface Props {
  children: React.ReactNode;
}

export const ScrollGrid = ({ children }: Props) => (
  <ScrollWrapper>
    <GridWrapper>{children}</GridWrapper>
  </ScrollWrapper>
);

export default ScrollGrid;
