import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';

import AppForm, { ManifestType, Values } from './AppForm';
import { validationSchema } from './utils';

interface Props {
  className?: string;
  focusFieldOnInitialMount?: boolean;
  handleCancel: () => void;
  handleSubmitValues: (values: Values) => Promise<void>;
  initialValues?: Values;
}

const defaultInitialValues: Values = {
  // contexts: [{ $type: '' }],
  // images: [],
  // intents: [],
  description: '',
  icon: '',
  id: '',
  manifestType: ManifestType.AppUrl,
  name: '',
  title: '',
  url: '',
};

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (handleCancel: Props['handleCancel'], focusFieldOnInitialMount?: boolean, className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid, setFieldValue, touched, values } = props;

  return (
    <AppForm
      className={className}
      errors={errors}
      handleBlur={handleBlur}
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      focusFieldOnInitialMount={focusFieldOnInitialMount}
      isSubmitting={isSubmitting}
      isValid={isValid}
      setFieldValue={setFieldValue}
      touched={touched}
      values={values}
    />
  );
};

const AppFormik = ({ className, handleSubmitValues, handleCancel, initialValues, focusFieldOnInitialMount }: Props) => (
  <Formik
    initialValues={initialValues || defaultInitialValues}
    onSubmit={handleFormikSubmit(handleSubmitValues)}
    render={renderForm(handleCancel, focusFieldOnInitialMount, className)}
    validationSchema={validationSchema}
  />
);

export default AppFormik;
