import * as React from 'react';

import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import Label from '../Label';
import Loading from '../Loading';
import { Form, IntroMessage, StyledButton } from './ForgotPasswordRequestForm.css';

interface Errors {
  username?: string;
}

interface Touched {
  username?: boolean;
}

export interface Values {
  username: string;
}

interface Props {
  className?: string;
  errors: Errors;
  handleBlur: (e: React.FocusEvent) => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  touched: Touched;
  values: Values;
}

const ForgotPasswordRequestForm = ({ className, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }: Props) => {
  const renderError = errors.username && touched.username ? () => <ErrorMessage>{errors.username}</ErrorMessage> : undefined;

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <IntroMessage>
        Enter your email below, and we’ll send you a temporary password. You’ll be able to log in with that password one time, and then can reset your password.
      </IntroMessage>

      <Label label="Email" renderError={renderError}>
        <Input hasError={!!errors.username && touched.username} name="username" onBlur={handleBlur} onChange={handleChange} value={values.username} />
      </Label>

      <StyledButton type="submit">{isSubmitting ? <Loading size={15} /> : 'Submit'}</StyledButton>
    </Form>
  );
};

export default ForgotPasswordRequestForm;
