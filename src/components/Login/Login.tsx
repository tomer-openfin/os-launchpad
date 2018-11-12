import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { CTA, Wrapper } from './Login.css';

interface SubmitPayload {
  email: string;
  password: string;
}

type SubmitFn = (payload: SubmitPayload) => void;

interface Props {
  onSubmit: SubmitFn;
  loginError: boolean;
}

/**
 * Higher order function to pass a function to Formik's onSubmit
 *
 * @param {SubmitFn}
 *
 * @returns {SubmitPayload => void}
 */
const handleSubmit = (onSubmit: SubmitFn) => (values: SubmitPayload) => {
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
      name="email"
      placeholder="Email"
      type="email"
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
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSubmit(onSubmit)}
      render={LoginForm}
    />
  </Wrapper>
);

export default Login;
