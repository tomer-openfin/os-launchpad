import * as React from 'react';

import { CheckboxUI, HiddenInput, StyledLabel } from './Checkbox.css';

interface Props {
  checked: boolean;
  index?: number; // for cascade animations
  label: string;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent) => void;
}

const Checkbox = ({ checked, label, name, onBlur, onChange, index = 1 }: Props) => {
  return (
    <StyledLabel label={label} index={index} >
      <HiddenInput name={name} onBlur={onBlur} type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxUI checked={checked} />
    </StyledLabel>
  );
};

export default Checkbox;
