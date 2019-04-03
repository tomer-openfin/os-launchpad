import { Formik, FormikActions, FormikProps, FormikValues } from 'formik';
import * as React from 'react';

import { App } from '../../types/commons';
import AppForm, { Values } from './AppForm';
import { validationSchema } from './utils';

interface Props {
  className?: string;
  // handleSubmitValues: (values: App) => Promise<void>;
  handleSubmitValues: (values: Values) => Promise<void>;
  handleCancel: () => void;
  // initialValues?: App;
  initialValues?: Values;
}

const defaultInitialValues: App = {
  appUrl: '',
  // contexts: [{ $type: '' }],
  description: '',
  icon: '',
  id: '',
  // images: [],
  // intents: [],
  manifest_url: '',
  name: '',
  title: '',
  withAppUrl: false,
};

// todo (js): use generic for submit vals, move to utils
const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (handleCancel: Props['handleCancel'], className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid, touched, values } = props;

  return (
    <AppForm
      className={className}
      errors={errors}
      handleBlur={handleBlur}
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isValid={isValid}
      touched={touched}
      values={values}
    />
  );
};

const AppFormik = ({ className, handleSubmitValues, handleCancel, initialValues }: Props) => (
  <Formik
    initialValues={initialValues || defaultInitialValues}
    onSubmit={handleFormikSubmit(handleSubmitValues)}
    render={renderForm(handleCancel, className)}
    validationSchema={validationSchema}
  />
);

export default AppFormik;
