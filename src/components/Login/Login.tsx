import { Formik } from 'formik';
import * as React from 'react';

import { LoginRequestPayload, LoginWithNewPasswordPayload, MeLoginState } from '../../redux/me';

import Borders from '../Borders';
import Checkbox from '../Checkbox';
import FormField from '../FormField';
import WindowHeader from '../WindowHeader';
import { ContentWrapper, CTA, FormWrapper, ResponseMessage, StyledLogo, Wrapper } from './Login.css';

interface Props {
  closeApplication: () => void;
  login: (options: LoginRequestPayload) => void;
  loginWithNewPassword: (options: LoginWithNewPasswordPayload) => void;
  loginState: MeLoginState;
}

const { USERNAME, PASSWORD } = process.env;

const initialValues =
  USERNAME && PASSWORD && document.location && document.location.host.indexOf('8080') !== -1
    ? { username: USERNAME, password: PASSWORD, logoutOnQuit: false }
    : { username: '', password: '', logoutOnQuit: false };

/**
 * Higher order function to pass a function to Formik's onSubmit
 *
 * @param {SubmitFn}
 *
 * @returns {LoginRequestPayload => void}
 */
const handleSubmit = (loginState: MeLoginState, login: Props['login'], loginWithNewPassword: Props['loginWithNewPassword']) => values => {
  const { changePassword, session } = loginState;

  const { username, password, newPassword } = values;

  if (changePassword) {
    loginWithNewPassword({ username, newPassword, session });
  } else {
    login({ username, password });
  }
};

const renderMessage = ({ error, message }: MeLoginState) =>
  (error || message) && <ResponseMessage error={error}>{message || 'Login failed. Please try again.'}</ResponseMessage>;

/**
 * LoginForm component
 *
 * @returns {React.StatelessComponent}
 */
const LoginForm = ({ values }) => {
  return (
    <FormWrapper key="login">
      <FormField label="Email" name="username" placeholder="Enter Email" type="text" />

      <FormField label="Password" name="password" placeholder="Enter Password" type="password" />

      <Checkbox label="Log me out when I quit" name="logoutOnQuit" checked={values.logoutOnQuit} />

      <CTA type="submit">Login</CTA>
    </FormWrapper>
  );
};

/**
 * ChangePasswordForm component
 *
 * @returns {React.StatelessComponent}
 */
const ChangePasswordForm = () => (
  <FormWrapper key="changePassword">
    <FormField label="New Password" name="newPassword" placeholder="Enter Password" type="password" />

    <FormField label="Password Confirmation" name="newPasswordConfirmation" placeholder="Confirm Password" type="password" />

    <CTA type="submit">Create New Password</CTA>
  </FormWrapper>
);

/**
 * Login component
 *
 * @param {Props} - Login props
 *
 * @returns {React.StatelessComponent}
 */
const Login = ({ closeApplication, loginState, login, loginWithNewPassword }: Props) => (
  <Wrapper>
    <Borders borderRadius="6px">
      <WindowHeader handleClose={closeApplication}>Log In</WindowHeader>

      <ContentWrapper>
        <StyledLogo size={90} />

        {renderMessage(loginState)}

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit(loginState, login, loginWithNewPassword)}
          render={loginState.changePassword ? ChangePasswordForm : LoginForm}
        />
      </ContentWrapper>
    </Borders>
  </Wrapper>
);

export default Login;
