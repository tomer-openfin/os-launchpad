import * as React from 'react';

import { Input, Label } from './RadioButton.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const RadioButton = ({ children, ...rest }: Props) => (
  <Label className={rest.className} checked={rest.checked}>
    <Input {...rest} type="radio" />

    {children}
  </Label>
);

export default RadioButton;
