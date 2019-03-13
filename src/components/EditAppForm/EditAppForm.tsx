import * as React from 'react';

import withFormik from '../../hocs/withFormik';
import AppForm, { SetFieldValue, validationSchema, Values } from '../AppForm';

interface FormProps {
  handleSubmit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  setFieldValue: SetFieldValue;
  values: Values;
}

export const EditAppForm = (handleCancel: () => void) => ({ setFieldValue, handleSubmit, isSubmitting, isValid, values }: FormProps) => (
  <AppForm
    setFieldValue={setFieldValue}
    handleSubmit={handleSubmit}
    isSubmitting={isSubmitting}
    isValid={isValid}
    values={values}
    handleCancel={handleCancel}
  />
);

const EditAppFormik = withFormik<Values>(EditAppForm, validationSchema);

export default EditAppFormik;
