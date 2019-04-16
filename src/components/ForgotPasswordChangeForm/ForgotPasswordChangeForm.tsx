import * as React from 'react';

import { renderError } from '../../utils/renderError';

import { Form, IntroMessage, StyledButton } from './ForgotPasswordChangeForm.css';

import Input from '../Input';
import Label from '../Label';
import Loading from '../Loading';

interface Errors {
  code?: string;
  password?: string;
  confirmPassword?: string;
}

interface Touched {
  code?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
}

export interface Values {
  code: string;
  password: string;
  confirmPassword: string;
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

const ForgotPasswordChangeForm = ({ className, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }: Props) => {
  return (
    <Form className={className} onSubmit={handleSubmit}>
      <IntroMessage>
        Please check your email, we have sent you a code. Once you have it, enter that code, plus your new password (twice) to reset your password.
      </IntroMessage>

      <Label label="Code" renderError={renderError(errors.code, touched.code)}>
        <Input
          onBlur={handleBlur}
          hasError={!!errors.code && touched.code}
          name="code"
          onChange={handleChange}
          placeholder="Enter Code"
          type="text"
          value={values.code}
        />
      </Label>

      <Label label="Password" renderError={renderError(errors.password, touched.password)}>
        <Input
          hasError={!!errors.password && touched.password}
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Enter Password"
          type="password"
          value={values.password}
        />
      </Label>

      <Label label="Confirm Password" renderError={renderError(errors.confirmPassword, touched.confirmPassword)}>
        <Input
          hasError={!!errors.confirmPassword && touched.confirmPassword}
          name="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Enter Password"
          type="password"
          value={values.confirmPassword}
        />
      </Label>

      <StyledButton type="submit">{isSubmitting ? <Loading size={15} /> : 'Change Password'}</StyledButton>
    </Form>
  );
};

export default ForgotPasswordChangeForm;
