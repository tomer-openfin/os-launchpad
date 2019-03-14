import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import ChangePasswordForm, { Values } from './ChangePasswordForm';

interface Props {
  className?: string;
  handleSubmitValues: (values: Values) => Promise<void>;
}

const initialValues: Values = { confirmPassword: '', newPassword: '' };

const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Required'),
  newPassword: Yup.string().required('Required'),
});

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = props;

  return (
    <ChangePasswordForm
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
