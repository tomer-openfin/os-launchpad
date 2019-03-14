import * as React from 'react';

import withTimeout from '../../hocs/withTimeout';

import { Color } from '../../styles';
import { Banner, MessageWrapper, StyledCloseButton, Wrapper } from './MessageBanner.css';

interface Props {
  backgroundColor?: Color;
  message: string;
  reset: () => void;
  isActive: boolean;
}

const MessageBanner = ({ backgroundColor, reset, message, isActive }: Props) => (
  <Wrapper>
    <Banner backgroundColor={backgroundColor} shown={isActive}>
      <MessageWrapper>{message}</MessageWrapper>

      <StyledCloseButton hoverColor={Color.JUPITER} onClick={reset} />
    </Banner>
  </Wrapper>
);

export default MessageBanner;

export const MessageBannerWithTimeout = withTimeout(MessageBanner);
