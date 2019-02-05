import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import ForgotPasswordChangeForm, { Values } from './ForgotPasswordChangeForm';

interface Props {
  className?: string;
  handleSubmitValues: (payload: Values) => Promise<void>;
}

const initialValues: Values = { code: '', confirmPassword: '', password: '' };
const validationSchema = Yup.object().shape({
  code: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = props;

  return (
    <ForgotPasswordChangeForm
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

const ForgotPasswordChangeFormik = ({ className, handleSubmitValues }: Props) => (
  <Formik initialValues={initialValues} onSubmit={handleFormikSubmit(handleSubmitValues)} render={renderForm(className)} validationSchema={validationSchema} />
);

export default ForgotPasswordChangeFormik;
