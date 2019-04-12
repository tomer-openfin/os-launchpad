import * as React from 'react';

import { CheckboxUI, LabelText, Wrapper } from './Checkbox.css';

interface Props {
  checked: boolean;
  index?: number; // for cascade animations
  label: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: () => void;
}

const Checkbox = ({ checked, label, onChange, index = 1 }: Props) => {
  return (
    <Wrapper index={index}>
      <CheckboxUI checked={checked} onClick={onChange} />

      {label && <LabelText>{label}</LabelText>}
    </Wrapper>
  );
};

export default Checkbox;
