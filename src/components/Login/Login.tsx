import { Field, Form, Formik } from 'formik';
import * as React from 'react';

import { LoginRequestPayload, LoginWithNewPasswordPayload, MeLoginState } from '../../redux/me';

import Logo from '../Logo';
import { CTA, FieldWrapper, ResponseMessage, Wrapper } from './Login.css';

interface Props {
  login: (options: LoginRequestPayload) => void;
  loginWithNewPassword: (options: LoginWithNewPasswordPayload) => void;
  loginState: MeLoginState;
}

const { USERNAME, PASSWORD } = process.env;

const initialValues: LoginRequestPayload =
  USERNAME && PASSWORD && document.location && document.location.host.indexOf('8080') !== -1
    ? { username: USERNAME, password: PASSWORD }
    : { username: '', password: '' };

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
const LoginForm = () => (
  <Form key="login">
    <FieldWrapper>
      <Field name="username" placeholder="Username" type="text" />
    </FieldWrapper>

    <FieldWrapper>
      <Field name="password" placeholder="Password" type="password" />
    </FieldWrapper>

    <FieldWrapper>
      <CTA type="submit">Login</CTA>
    </FieldWrapper>
  </Form>
);

/**
 * ChangePasswordForm component
 *
 * @returns {React.StatelessComponent}
 */
const ChangePasswordForm = () => (
  <Form key="changePassword">
    <FieldWrapper>
      <Field name="newPassword" placeholder="New Password" type="password" />
    </FieldWrapper>

    <FieldWrapper>
      <Field name="newPasswordConfirmation" placeholder="Confirm Password" type="password" />
    </FieldWrapper>

    <FieldWrapper>
      <CTA type="submit">Create New Password</CTA>
    </FieldWrapper>
  </Form>
);

/**
 * Login component
 *
 * @param {Props} - Login props
 *
 * @returns {React.StatelessComponent}
 */
const Login = ({ loginState, login, loginWithNewPassword }: Props) => (
  <Wrapper>
    <Logo />

    {renderMessage(loginState)}

    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit(loginState, login, loginWithNewPassword)}
      render={loginState.changePassword ? ChangePasswordForm : LoginForm}
    />
  </Wrapper>
);

export default Login;
