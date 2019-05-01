import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import LoginForm, { Values } from './LoginForm';

interface Props {
  className?: string;
  handleSubmitValues: (values: Values) => Promise<void>;
  isTabDisabled?: boolean;
}

const { USERNAME, PASSWORD } = process.env;
const isDev = document && document.location && document.location.host.indexOf('8080') !== -1;

const initialValues: Values = { username: isDev && USERNAME ? USERNAME : '', password: isDev && PASSWORD ? PASSWORD : '' };
const validationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
});

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (className?: string, isTabDisabled?: boolean) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid, touched, values } = props;

  return (
    <LoginForm
      className={className}
      errors={errors}
      handleBlur={handleBlur}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isTabDisabled={isTabDisabled}
      isValid={isValid}
      touched={touched}
      values={values}
    />
  );
};

const LoginFormik = ({ className, handleSubmitValues, isTabDisabled }: Props) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleFormikSubmit(handleSubmitValues)}
    render={renderForm(className, isTabDisabled)}
    validationSchema={validationSchema}
  />
);

export default LoginFormik;
