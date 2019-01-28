import { ErrorMessage, Field } from 'formik';
import * as React from 'react';

import { Error, Label, LabelText } from './FormField.css';

interface Props {
  children?;
  checked?: boolean;
  className?: string;
  component?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  label?: string;
  maxLength?: string;
  name: string;
  placeholder?: string;
  type: string;
  validate?;
}

export const FormField = ({ checked, children, className, component, isInvalid, type, name, maxLength, validate, placeholder, disabled, label }: Props) => (
  <Label className={className} isValid={!isInvalid}>
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
