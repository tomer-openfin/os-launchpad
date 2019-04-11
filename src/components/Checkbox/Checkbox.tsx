import * as React from 'react';

import { CheckboxUI, HiddenInput, LabelText, Wrapper } from './Checkbox.css';

interface Props {
  checked: boolean;
  name: string;
  label: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<Element>) => void;
}

const Checkbox = ({ checked, name, label, onBlur, onChange }: Props) => {
  return (
    <Wrapper>
      <HiddenInput name={name} type="checkbox" checked={checked} onBlur={onBlur} onChange={onChange} />

      <CheckboxUI checked={checked} />

      {label && <LabelText>{label}</LabelText>}
    </Wrapper>
  );
};

export default Checkbox;
