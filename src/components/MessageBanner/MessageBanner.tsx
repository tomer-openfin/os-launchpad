import * as React from 'react';

import { Color } from '../../styles/index';
import { Banner, MessageWrapper, StyledCloseButton, Wrapper } from './MessageBanner.css';

interface Props {
  backgroundColor?: Color;
  message: string;
  handleClose: () => void;
  shown: boolean;
}

const MessageBanner = ({ backgroundColor, handleClose, message, shown }: Props) => (
  <Wrapper>
    <Banner backgroundColor={backgroundColor} shown={shown}>
      <MessageWrapper>{message}</MessageWrapper>

      <StyledCloseButton hoverColor={Color.JUPITER} onClick={handleClose} />
    </Banner>
  </Wrapper>
);

export default MessageBanner;
