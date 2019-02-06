import * as React from 'react';

import Borders from '../Borders';
import ForgotPasswordChangeForm from '../ForgotPasswordChangeForm';
import ForgotPasswordRequestForm from '../ForgotPasswordRequestForm';
import ForgotPasswordSuccess from '../ForgotPasswordSuccess';
import WindowHeader from '../WindowHeader';
import { ContentWrapper, StyledErrorMessage, Wrapper } from './ForgotPassword.css';

export enum Stage {
  Request = 'request',
  Change = 'change',
  Success = 'success',
}

export interface Props {
  handleClose: () => void;
}

interface State {
  message: string;
  stage: Stage;
  username: string;
}

interface ViewProps extends Props, State {
  handleError: (message: string) => void;
  transition: (payload?: { username: string }) => void;
}

export const ForgotPasswordView = ({ handleClose, handleError, message, stage, transition, username }: ViewProps) => {
  return (
    <Wrapper>
      <Borders borderRadius="6px">
        <WindowHeader handleBack={handleClose}>Forgot Password</WindowHeader>

        <ContentWrapper>
          {(() => {
            switch (stage) {
              case Stage.Request: {
                return <ForgotPasswordRequestForm successCb={transition} errorCb={handleError} />;
              }
              case Stage.Change: {
                return <ForgotPasswordChangeForm successCb={transition} errorCb={handleError} username={username} />;
              }
              case Stage.Success: {
                return <ForgotPasswordSuccess handleClick={handleClose} />;
              }
              default: {
                return null;
              }
            }
          })()}
        </ContentWrapper>

        {message && <StyledErrorMessage>{message}</StyledErrorMessage>}
      </Borders>
    </Wrapper>
  );
};

class ForgotPassword extends React.Component<Props, State> {
  state = {
    message: '',
    stage: Stage.Request,
    username: '',
  };

  transition = (payload?: { username: string }) => {
    const { stage } = this.state;
    const username = payload ? payload.username : '';

    switch (stage) {
      case Stage.Request: {
        return this.setState({ message: '', stage: Stage.Change, username });
      }
      case Stage.Change: {
        return this.setState({ message: '', stage: Stage.Success });
      }
      default: {
        return undefined;
      }
    }
  };

  handleError = (message: string) => {
    this.setState({ message });
  };

  render() {
    return <ForgotPasswordView {...this.props} {...this.state} handleError={this.handleError} transition={this.transition} />;
  }
}

export default ForgotPassword;
