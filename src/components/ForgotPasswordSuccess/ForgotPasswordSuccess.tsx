import * as React from 'react';

import { IntroMessage, StyledButton, Wrapper } from './ForgotPasswordSuccess.css';

interface Props {
  className?: string;
  handleClick: () => void;
}

const ForgotPasswordSuccess = ({ className, handleClick }: Props) => (
  <Wrapper className={className}>
    <IntroMessage>Your password has successfully been changed. Please log in with your new credentials in the main log in screen.</IntroMessage>

    <StyledButton onClick={handleClick}>Back To Log In</StyledButton>
  </Wrapper>
);

export default ForgotPasswordSuccess;
