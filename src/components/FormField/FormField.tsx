import { ErrorMessage, Field } from 'formik';
import * as React from 'react';

import { Error, Label, LabelText } from './FormField.css';

interface Props {
  children?;
  checked?: boolean;
  className?: string;
  component?: string;
  disabled?: boolean;
  label?: string;
  maxLength?: string;
  name: string;
  placeholder?: string;
  type: string;
  validate?;
}

export const FormField = ({ checked, children, className, component, type, name, maxLength, validate, placeholder, disabled, label }: Props) => (
  <Label className={className}>
    {label && <LabelText>{label}</LabelText>}

    <Field
      type={type}
      component={component}
      name={name}
      maxLength={maxLength}
      validate={validate}
      placeholder={placeholder}
      disabled={disabled}
      checked={checked}
    />

    <ErrorMessage component={Error} name={name} />

    {children}
  </Label>
);

export default FormField;
