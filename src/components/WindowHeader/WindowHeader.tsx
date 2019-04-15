import * as React from 'react';

import * as ArrowCircle from '../../assets/ArrowCircle.svg';

import { Color } from '../../styles';

import { EventType, sendAnalytics } from '../../utils/analytics';
import CloseButton from '../CloseButton';
import SvgIcon from '../SvgIcon/SvgIcon';
import { Children, CtaWrapper, Header, Title } from './WindowHeader.css';

interface Props {
  backgroundColor?: string;
  children?: React.ReactNode;
  handleBack?: () => void;
  handleClose?: () => void;
  isDragDisabled?: boolean;
  label: string;
}

export const defaultProps = {
  backgroundColor: Color.KUIPER_BELT,
};

const { backgroundColor: defaultBackgroundColor } = defaultProps;

const WindowHeader = ({ backgroundColor = defaultBackgroundColor, children, handleBack, handleClose, isDragDisabled, label }: Props) => {
  const handleClickClose = () => {
    if (handleClose) {
      // TODO - Remove label prop and change to less of a global change
      sendAnalytics({ type: EventType.Close, label });
      handleClose();
    }
  };
  return (
    <Header backgroundColor={backgroundColor} isDragDisabled={isDragDisabled}>
      {handleBack && (
        <CtaWrapper>
          <SvgIcon imgSrc={ArrowCircle} onClick={handleBack} size={25} />
        </CtaWrapper>
      )}

      <Children>{typeof children === 'string' ? <Title>{children}</Title> : children}</Children>

      {handleClose && (
        <CtaWrapper>
          <CloseButton onClick={handleClickClose} />
        </CtaWrapper>
      )}
    </Header>
  );
};

export default WindowHeader;
