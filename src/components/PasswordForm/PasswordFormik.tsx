import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import PasswordForm, { Values } from './PasswordForm';

interface Props {
  className?: string;
  handleSubmitValues: (values: Values) => Promise<void>;
  handleCancel: () => void;
}

const initialValues: Values = { confirmPassword: '', password: '', newPassword: '' };

export const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Required'),
  newPassword: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (handleCancel: Props['handleCancel'], className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid, touched, values } = props;

  return (
    <PasswordForm
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

const PasswordFormik = ({ className, handleSubmitValues, handleCancel }: Props) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleFormikSubmit(handleSubmitValues)}
    render={renderForm(handleCancel, className)}
    validationSchema={validationSchema}
  />
);

export default PasswordFormik;
