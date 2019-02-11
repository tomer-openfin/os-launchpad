import { ErrorMessage, Field } from 'formik';
import * as React from 'react';

import { Error, Label, LabelText } from './FormField.css';

interface Props {
  checked?: boolean;
  children?;
  className?: string;
  component?: string;
  disabled?: boolean;
  htmlInputRef?: React.RefObject<HTMLInputElement>;
  isInvalid?: boolean;
  label?: string;
  maxLength?: string;
  name: string;
  placeholder?: string;
  type: string;
  validate?;
}

export const FormField = ({
  checked,
  children,
  className,
  component,
  disabled,
  htmlInputRef,
  isInvalid,
  label,
  maxLength,
  name,
  placeholder,
  type,
  validate,
}: Props) => (
  <Label className={className} isValid={!isInvalid}>
    {label && <LabelText>{label}</LabelText>}

    <Field
      checked={checked}
      component={component}
      disabled={disabled}
      innerRef={htmlInputRef}
      maxLength={maxLength}
      name={name}
      placeholder={placeholder}
      type={type}
      validate={validate}
    />

    <ErrorMessage component={Error} name={name} />

    {children}
  </Label>
);

export default FormField;
