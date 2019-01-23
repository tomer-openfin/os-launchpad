import * as React from 'react';

import { FormFieldWrapper, LabelText, RadioUI, RadioWrapper } from './RadioToggle.css';

interface Props {
  value: boolean;
  name: string;
  label: string;
  firstRadioLabel?: string;
  secondRadioLabel?: string;
}

const RadioToggle = ({ value, name, label, firstRadioLabel, secondRadioLabel }: Props) => {
  return (
    <FormFieldWrapper label={label} name={name} type="checkbox" checked={value}>
      <RadioWrapper>
        <RadioUI checked={value} />

        {firstRadioLabel && <LabelText>{firstRadioLabel}</LabelText>}
      </RadioWrapper>

      <RadioWrapper>
        <RadioUI checked={!value} />

        {secondRadioLabel && <LabelText>{secondRadioLabel}</LabelText>}
      </RadioWrapper>
    </FormFieldWrapper>
  );
};

export default RadioToggle;
