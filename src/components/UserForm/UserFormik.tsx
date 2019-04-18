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
  sendEmail: true,
  tmpPassword: '',
  username: '',
};

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

type SetFieldValue = <T extends keyof Values>(field: T, value: Values[T], shouldValidate?: boolean) => void;

const myHandleChange = (setFieldValue: SetFieldValue, handleChange: (e: React.ChangeEvent) => void, prevValues: Values) => (e: React.ChangeEvent) => {
  if (e.target.getAttribute('type') === 'checkbox') {
    const name = e.target.getAttribute('name') as keyof Values;

    setFieldValue(name, !prevValues[name]);
    return;
  }

  handleChange(e);
};

const renderForm = (handleCancel: Props['handleCancel'], withPasswordField: boolean, className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid, setFieldValue, touched, values } = props;

  return (
    <UserForm
      className={className}
      errors={errors}
      handleBlur={handleBlur}
      handleCancel={handleCancel}
      handleChange={myHandleChange(setFieldValue, handleChange, values)}
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
