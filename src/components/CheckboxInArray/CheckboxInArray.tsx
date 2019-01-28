import { Field } from 'formik';
import * as React from 'react';

import { CustomCheckbox, Input, Label, LabelText } from './CheckboxInArray.css';

interface Props {
  name: string;
  value;
}

const CheckboxInArray = (props: Props) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <Label>
          <Input
            type="checkbox"
            {...props}
            checked={field.value && field.value.includes(props.value)}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={() => {
              // for new app form, incoming array `field.value` starts off as []
              // for edit app form, incoming array `field.value` starts with previously checked items
              if (field.value && field.value.includes(props.value)) {
                const nextValue = field.value.filter(value => value !== props.value);
                form.setFieldValue(props.name, nextValue);
              } else {
                // add checked value to overall 'contexts' or 'intents' arrays
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />

          <CustomCheckbox isChecked={field.value && field.value.includes(props.value)} />

          <LabelText>{props.value}</LabelText>
        </Label>
      )}
    </Field>
  );
};

export default CheckboxInArray;
