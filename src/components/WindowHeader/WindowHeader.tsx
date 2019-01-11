import * as React from 'react';

import { Color } from '../../styles';

import CloseButton from '../CloseButton';
import { Children, CtaWrapper, Header, Title } from './WindowHeader.css';

interface Props {
  backgroundColor?: string;
  handleClose?: () => void;
  children?: React.ReactNode;
}

const defaultProps: Partial<Props> = {
  backgroundColor: Color.KUIPER_BELT,
};

const { backgroundColor: defaultBackgroundColor } = defaultProps;

const WindowHeader = ({ children, handleClose, backgroundColor = defaultBackgroundColor }: Props) => (
  <Header backgroundColor={backgroundColor}>
    <Children>{typeof children === 'string' ? <Title>{children}</Title> : children}</Children>

    {handleClose && (
      <CtaWrapper>
        <CloseButton onClick={handleClose} />
      </CtaWrapper>
    )}
  </Header>
);

export default WindowHeader;
