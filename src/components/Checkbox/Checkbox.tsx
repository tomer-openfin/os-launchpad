import * as React from 'react';

import { CheckboxUI, HiddenInput, StyledLabel } from './Checkbox.css';

interface Props {
  checked: boolean;
  index?: number; // for cascade animations
  label: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: () => void;
}

const Checkbox = ({ checked, label, onBlur, onChange, index = 1 }: Props) => {
  return (
    <StyledLabel label={label} index={index} onClick={onChange}>
      <HiddenInput onBlur={onBlur} type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxUI checked={checked} />
    </StyledLabel>
  );
};

export default Checkbox;
