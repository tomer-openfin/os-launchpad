import * as React from 'react';

import { CheckboxUI, FormFieldWrapper, LabelText } from './Checkbox.css';

interface Props {
  checked: boolean;
  name: string;
  label;
}

const Checkbox = ({ checked, name, label }: Props) => {
  return (
    <FormFieldWrapper name={name} type="checkbox" checked={checked}>
      <CheckboxUI checked={checked} />

      {label && <LabelText>{label}</LabelText>}
    </FormFieldWrapper>
  );
};

export default Checkbox;
