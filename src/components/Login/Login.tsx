import { Field, Form, Formik } from 'formik';
import * as React from 'react';

interface SubmitPayload {
  email: string;
  password: string;
}

type SubmitFn = (payload: SubmitPayload) => void;

interface Props {
  onSubmit: SubmitFn;
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

    <button type="submit">
      Login
    </button>
  </Form>
);

/**
 * Login component
 *
 * @param {Props} - Login props
 *
 * @returns {React.StatelessComponent}
 */
const Login = ({ onSubmit }: Props) => (
  <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSubmit(onSubmit)}
      render={LoginForm}
    />
  </div>
);

export default Login;
