import * as React from 'react';

import { values } from 'lodash-es';
import Input from '../Input/index';
import { FormFieldWrapper, LabelText, RadioUI, RadioWrapper } from './RadioToggle.css';

interface Props {
  value: boolean;
  name: string;
  label: string;
  firstRadioLabel?: string;
  secondRadioLabel?: string;
}

// radios: {name, value, label}

// radio.forEach => {
//   <Label text=label></Label>
//   <Input name values/>
// }

const RadioToggle = ({ value, name, label, firstRadioLabel, secondRadioLabel }: Props) => {
  return (
    // <FormFieldWrapper label={label} name={name} type="checkbox" checked={value}>
    <FormFieldWrapper>
      <RadioWrapper>
        {/* <RadioUI checked={value} /> */}
        <Input type="radio" name={name} />

        {firstRadioLabel && <LabelText>{firstRadioLabel}</LabelText>}
      </RadioWrapper>

      <RadioWrapper>
        <RadioUI checked={!value} />

        {secondRadioLabel && <LabelText>{secondRadioLabel}</LabelText>}
        <Input type="radio" name={name} />
      </RadioWrapper>
    </FormFieldWrapper>
  );
};

export default RadioToggle;
