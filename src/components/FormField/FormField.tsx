import { ErrorMessage, Field } from 'formik';
import * as React from 'react';

import { Error, Label, LabelText } from './FormField.css';

interface Props {
  children?;
  component?: string;
  disabled?: boolean;
  label: string;
  maxLength?: string;
  name: string;
  placeholder?: string;
  type: string;
  validate?;
}

export const FormField = ({ children, component, type, name, maxLength, validate, placeholder, disabled, label }: Props) => (
  <Label>
    <LabelText>{label}</LabelText>

    <Field type={type} component={component} name={name} maxLength={maxLength} validate={validate} placeholder={placeholder} disabled={disabled} />

    <ErrorMessage component={Error} name={name} />

    {children}
  </Label>
);

export default FormField;
