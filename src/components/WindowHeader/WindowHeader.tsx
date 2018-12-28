import * as React from 'react';

import { Color } from '../../styles';

import CloseButton from '../CloseButton';
import { CtaWrapper, Header, Title } from './WindowHeader.css';

interface Props {
  backgroundColor?: string;
  justifyContent?: string;
  withoutClose?: boolean;
  children?: React.ReactNode;
}

const defaultProps: Partial<Props> = {
  backgroundColor: Color.KUIPER_BELT,
  justifyContent: 'space-between',
};

const handleClose = () => {
  const { fin } = window;
  if (fin) {
    fin.desktop.Window.getCurrent().hide();
  }
};

const { backgroundColor: defaultBackgroundColor, justifyContent: defaultJustifyContent } = defaultProps;

const WindowHeader = ({ children, withoutClose, backgroundColor = defaultBackgroundColor, justifyContent = defaultJustifyContent }: Props) => (
  <Header backgroundColor={backgroundColor} justifyContent={justifyContent}>
    {typeof children === 'string' ? <Title>{children}</Title> : children}

    {!withoutClose && (
      <CtaWrapper>
        <CloseButton onClick={handleClose} />
      </CtaWrapper>
    )}
  </Header>
);

export default WindowHeader;
