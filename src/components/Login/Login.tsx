import { Field, Form, Formik } from 'formik';
import * as React from 'react';

import { LoginRequestPayload } from '../../redux/me';

import { CTA, Wrapper } from './Login.css';

type SubmitFn = (payload: LoginRequestPayload) => void;

interface Props {
  onSubmit: SubmitFn;
  loginError: boolean;
}

const { USERNAME, PASSWORD } = process.env;

const initialValues: LoginRequestPayload = USERNAME && PASSWORD && document.location && document.location.host.indexOf('8080') !== -1
  ? { username: USERNAME, password: PASSWORD }
  : { username: '', password: '' };

/**
 * Higher order function to pass a function to Formik's onSubmit
 *
 * @param {SubmitFn}
 *
 * @returns {LoginRequestPayload => void}
 */
const handleSubmit = (onSubmit: SubmitFn) => (values: LoginRequestPayload) => {
  onSubmit(values);
};

/**
 * LoginForm component
 *
 * @returns {React.StatelessComponent}
 */
const LoginForm = () => (
  <Form>
    <Field
      name="username"
      placeholder="Username"
      type="text"
    />

    <br />

    <Field
      name="password"
      placeholder="Password"
      type="password"
    />

    <br />

    <CTA type="submit">
      Login
    </CTA>
  </Form>
);

/**
 * Login component
 *
 * @param {Props} - Login props
 *
 * @returns {React.StatelessComponent}
 */
const Login = ({ loginError, onSubmit }: Props) => (
  <Wrapper>
    {loginError && (
      <p style={{ color: 'red' }}>Login failed. Please try again.</p>
    )}

    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit(onSubmit)}
      render={LoginForm}
    />
  </Wrapper>
);

export default Login;
