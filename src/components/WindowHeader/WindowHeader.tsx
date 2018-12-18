import * as React from 'react';

import CloseButton from '../CloseButton';
import { Header, Title } from './WindowHeader.css';

interface Props {
  bottomBorder?: boolean;
  children?: React.ReactNode;
}

const WindowHeader = ({ bottomBorder, children }: Props) => (
  <Header>
    {typeof children === 'string' ? <Title>{children}</Title> : children}
    <CloseButton bottomBorder={bottomBorder} />
  </Header>
);

export default WindowHeader;
