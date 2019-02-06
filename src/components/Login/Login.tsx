import * as React from 'react';

import { LoginErrorPayload } from '../../redux/me/types';
import Borders from '../Borders';
import ChangePasswordForm from '../ChangePasswordForm';
import LoginForm from '../LoginForm';
import WindowHeader from '../WindowHeader';
import { ContentWrapper, FormWrapper, ResponseMessage, StyledLogo, Wrapper } from './Login.css';

export enum Stage {
  ChangePassword = 'changePassword',
  Login = 'login',
}

interface Props {
  className?: string;
  closeApplication: () => void;
}

interface State {
  error: boolean;
  message: string;
  session: string;
  stage: Stage;
  username: string;
}

interface ViewProps extends Props, State {
  handleError: (payload: LoginErrorPayload) => void;
}

export const LoginView = (props: ViewProps) => {
  const { className, closeApplication, handleError, error, message, session, stage, username } = props;

  return (
    <Wrapper className={className}>
      <Borders borderRadius="6px">
        <WindowHeader handleClose={closeApplication}>Log In</WindowHeader>

        <ContentWrapper>
          <StyledLogo size={90} />

          <FormWrapper>
            {stage === Stage.ChangePassword ? (
              <ChangePasswordForm errorCb={handleError} session={session} username={username} />
            ) : (
              <LoginForm errorCb={handleError} />
            )}
          </FormWrapper>

          {message && <ResponseMessage error={error}>{message || 'Login failed. Please try again.'}</ResponseMessage>}
        </ContentWrapper>
      </Borders>
    </Wrapper>
  );
};

class Login extends React.Component<Props, State> {
  state = {
    error: false,
    message: '',
    session: '',
    stage: Stage.Login,
    username: '',
  };

  handleError = (payload: LoginErrorPayload) => {
    const code = payload.code || '';
    if (code === 'NewPasswordRequired') {
      this.setState({
        error: false,
        message: payload.message,
        session: payload.session || '',
        stage: Stage.ChangePassword,
        username: payload.username,
      });
    } else {
      this.setState({
        error: true,
        message: payload.message,
        session: payload.session || '',
      });
    }
  };

  render() {
    return <LoginView {...this.props} {...this.state} handleError={this.handleError} />;
  }
}

export default Login;
