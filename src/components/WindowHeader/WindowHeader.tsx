import * as React from 'react';

import CloseButton from '../CloseButton';
import { Header, Title } from './WindowHeader.css';

interface Props {
  backgroundColor?: string;
  justifyContent?: string;
  withoutClose?: boolean;
  bottomBorder?: boolean;
  children?: React.ReactNode;
}

const WindowHeader = ({ bottomBorder, children, withoutClose, backgroundColor, justifyContent }: Props) => (
  <Header backgroundColor={backgroundColor} justifyContent={justifyContent}>
    {typeof children === 'string' ? <Title>{children}</Title> : children}

    {!withoutClose && <CloseButton bottomBorder={bottomBorder} />}
  </Header>
);

export default WindowHeader;
