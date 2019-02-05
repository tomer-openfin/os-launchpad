import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import ForgotPasswordRequestForm, { Values } from './ForgotPasswordRequestForm';

interface Props {
  className?: string;
  handleSubmitValues: (values: Values) => Promise<void>;
}

const initialValues: Values = { username: '' };
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
});

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = props;

  return (
    <ForgotPasswordRequestForm
      className={className}
      errors={errors}
      handleBlur={handleBlur}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      touched={touched}
      values={values}
    />
  );
};

const ForgotPasswordRequestFormik = ({ className, handleSubmitValues }: Props) => (
  <Formik initialValues={initialValues} onSubmit={handleFormikSubmit(handleSubmitValues)} render={renderForm(className)} validationSchema={validationSchema} />
);

export default ForgotPasswordRequestFormik;
