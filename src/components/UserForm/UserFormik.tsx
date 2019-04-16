import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';

import { YesNo } from '../../types/enums';
import UserForm, { Values } from './UserForm';
import { editUserSchema, newUserSchema } from './utils';

interface Props {
  className?: string;
  handleSubmitValues: (values: Values) => Promise<void>;
  handleCancel: () => void;
  initialValues?: Values;
  withPasswordField?: boolean;
  validationSchema: typeof newUserSchema | typeof editUserSchema;
}

const defaultInitialValues: Values = {
  email: '',
  firstName: '',
  id: '',
  isAdmin: YesNo.No,
  lastName: '',
  middleName: '',
  phone: '',
  tmpPassword: '',
  username: '',
};

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (handleCancel: Props['handleCancel'], withPasswordField: boolean, className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid, touched, values } = props;

  return (
    <UserForm
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
      withPasswordField={withPasswordField}
    />
  );
};

const UserFormik = ({ className, handleSubmitValues, handleCancel, initialValues, validationSchema, withPasswordField = false }: Props) => (
  <Formik
    initialValues={initialValues || defaultInitialValues}
    onSubmit={handleFormikSubmit(handleSubmitValues)}
    render={renderForm(handleCancel, withPasswordField, className)}
    validationSchema={validationSchema}
  />
);

export default UserFormik;
