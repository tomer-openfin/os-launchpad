import * as React from 'react';

import withFormik from '../../hocs/withFormik';

import AppForm, { SetFieldValue, validationSchema, Values } from '../AppForm';

interface Props {
  handleCancel?: () => void;
  handleSubmit: () => void;
  handleSuccess?: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  setFieldValue: SetFieldValue;
  values: Values;
}

export const NewAppForm = (handleCancel: () => void) => ({ handleSubmit, isSubmitting, isValid, setFieldValue, values }: Props) => (
  <AppForm
    focusFieldOnInitialMount
    handleCancel={handleCancel}
    handleSubmit={handleSubmit}
    isSubmitting={isSubmitting}
    isValid={isValid}
    setFieldValue={setFieldValue}
    values={values}
  />
);

const NewAppFormik = withFormik<Values>(NewAppForm, validationSchema);

export default NewAppFormik;
