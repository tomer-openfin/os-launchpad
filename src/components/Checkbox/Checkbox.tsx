import * as React from 'react';

import { CheckboxUI, HiddenInput, LabelText, Wrapper } from './Checkbox.css';

interface Props {
  checked: boolean;
  label: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: () => void;
}

const Checkbox = ({ checked, label, onChange }: Props) => {
  return (
    <Wrapper>
      <CheckboxUI checked={checked} onClick={onChange} />

      {label && <LabelText>{label}</LabelText>}
    </Wrapper>
  );
};

export default Checkbox;
