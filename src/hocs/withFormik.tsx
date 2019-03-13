import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';

interface Props<T> {
  handleCancel: () => void;
  handleSubmitValues: (values: T) => Promise<void>;
  initialValues: T;
}

type HandleFormikSubmit = <T>(handleSubmitValues: Props<T>['handleSubmitValues']) => (values: T, formikActions: FormikActions<T>) => void;

const handleFormikSubmit: HandleFormikSubmit = handleSubmitValues => async (values, actions) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

type FormBuilder<T> = (handleCancel: () => void) => (props: FormikProps<T>) => JSX.Element;

type WithFormik = <T>(form: FormBuilder<T>, validationSchema) => (props: Props<T>) => JSX.Element;

const withFormik: WithFormik = (form, validationSchema) => ({ handleCancel, handleSubmitValues, initialValues }) => (
  <Formik initialValues={initialValues} onSubmit={handleFormikSubmit(handleSubmitValues)} render={form(handleCancel)} validationSchema={validationSchema} />
);

export default withFormik;
