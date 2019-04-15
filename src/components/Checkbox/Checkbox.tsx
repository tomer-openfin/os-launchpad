import * as React from 'react';

import { CheckboxUI, StyledLabel } from './Checkbox.css';

interface Props {
  checked: boolean;
  index?: number; // for cascade animations
  label: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: () => void;
}

const Checkbox = ({ checked, label, onChange, index = 1 }: Props) => {
  return (
    <StyledLabel label={label} index={index} onClick={onChange}>
      <CheckboxUI checked={checked} />
    </StyledLabel>
  );
};

export default Checkbox;
