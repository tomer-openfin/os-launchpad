import * as React from 'react';

import { Color } from '../../styles';

import CloseButton from '../CloseButton';
import { Children, CtaWrapper, Header, Title } from './WindowHeader.css';

interface Props {
  backgroundColor?: string;
  withoutClose?: boolean;
  children?: React.ReactNode;
}

const defaultProps: Partial<Props> = {
  backgroundColor: Color.KUIPER_BELT,
};

const handleClose = () => {
  const { fin } = window;
  if (fin) {
    fin.desktop.Window.getCurrent().hide();
  }
};

const { backgroundColor: defaultBackgroundColor } = defaultProps;

const WindowHeader = ({ children, withoutClose, backgroundColor = defaultBackgroundColor }: Props) => (
  <Header backgroundColor={backgroundColor}>
    <Children>{typeof children === 'string' ? <Title>{children}</Title> : children}</Children>

    {!withoutClose && (
      <CtaWrapper>
        <CloseButton onClick={handleClose} />
      </CtaWrapper>
    )}
  </Header>
);

export default WindowHeader;
