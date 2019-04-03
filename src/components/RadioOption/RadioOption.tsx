import * as React from 'react';

import { HiddenInput, LabelText, RadioUI, RadioWrapper } from './RadioOption.css';

interface Props {
  label: string;
  option: string;
  optionName: string; // key
  selectedOption: string; // value
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<Element>) => void;
}

const RadioOption = ({ label, option, optionName, onBlur, onChange, selectedOption }: Props) => (
  <RadioWrapper>
    <HiddenInput checked={selectedOption === option} name={optionName} onBlur={onBlur} onChange={onChange} type="radio" value={option} />

    <RadioUI checked={selectedOption === option} />

    {label && <LabelText>{label}</LabelText>}
  </RadioWrapper>
);

export default RadioOption;
