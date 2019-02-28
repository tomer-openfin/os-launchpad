import * as React from 'react';

import * as ArrowCircle from '../../assets/ArrowCircle.svg';

import { Color } from '../../styles';

import CloseButton from '../CloseButton';
import SvgIcon from '../SvgIcon/SvgIcon';
import { Children, CtaWrapper, Header, Title } from './WindowHeader.css';

interface Props {
  backgroundColor?: string;
  handleBack?: () => void;
  handleClose?: () => void;
  children?: React.ReactNode;
}

export const defaultProps = {
  backgroundColor: Color.KUIPER_BELT,
};

const { backgroundColor: defaultBackgroundColor } = defaultProps;

const WindowHeader = ({ children, handleBack, handleClose, backgroundColor = defaultBackgroundColor }: Props) => (
  <Header backgroundColor={backgroundColor}>
    {handleBack && (
      <CtaWrapper>
        <SvgIcon imgSrc={ArrowCircle} onClick={handleBack} size={25} />
      </CtaWrapper>
    )}

    <Children>{typeof children === 'string' ? <Title>{children}</Title> : children}</Children>

    {handleClose && (
      <CtaWrapper>
        <CloseButton onClick={handleClose} />
      </CtaWrapper>
    )}
  </Header>
);

export default WindowHeader;
