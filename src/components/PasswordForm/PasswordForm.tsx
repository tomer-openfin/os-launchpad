import * as React from 'react';

import { renderError } from '../../utils/renderError';

import FormFooter from '../FormFooter';
import Input from '../Input';
import Label from '../Label';
import ScrollGrid, { Form } from '../Responsive';

interface Errors {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface Touched {
  password?: boolean;
  newPassword?: boolean;
  confirmPassword?: boolean;
}

export interface Values {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  className?: string;
  errors: Errors;
  handleBlur: (e: React.FocusEvent) => void;
  handleCancel: () => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  touched: Touched;
  values: Values;
}

export const PasswordForm = ({ handleSubmit, isSubmitting, isValid, touched, values, handleChange, handleBlur, errors, handleCancel, className }: Props) => (
  <Form className={className} onSubmit={handleSubmit}>
    <ScrollGrid>
      <Label label="Old Password" renderError={renderError(errors.password, touched.password)}>
        <Input
          hasError={!!errors.password && touched.password}
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Enter Old Password"
          type="password"
          value={values.password}
        />
      </Label>

      <Label label="New Password" renderError={renderError(errors.newPassword, touched.newPassword)}>
        <Input
          hasError={!!errors.newPassword && touched.newPassword}
          name="newPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Enter New Password"
          type="password"
          value={values.newPassword}
        />
      </Label>

      <Label label="Confirm New Password" renderError={renderError(errors.confirmPassword, touched.confirmPassword)}>
        <Input
          hasError={!!errors.confirmPassword && touched.confirmPassword}
          name="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Enter New Password Again"
          type="password"
          value={values.confirmPassword}
        />
      </Label>
    </ScrollGrid>

    <FormFooter isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid} handleCancel={handleCancel} buttonWidths={153} />
  </Form>
);

export default PasswordForm;
