import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import BugForm, { Values } from './BugForm';

interface Props {
  className?: string;
  handleCancel: () => void;
  handleError: () => void;
  handleSuccess: () => void;
  handleSubmitValues: (payload: string) => Promise<void>;
}

const initialValues: Values = {
  description: '',
  steps: '',
  subject: '',
};

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Required'),
  steps: Yup.string().required('Required'),
  subject: Yup.string().required('Required'),
});

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(JSON.stringify(values));

  actions.setSubmitting(false);
};

const renderForm = (handleCancel: Props['handleCancel'], className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = props;

  return (
    <BugForm
      className={className}
      errors={errors}
      handleBlur={handleBlur}
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      touched={touched}
      values={values}
    />
  );
};

const BugFormik = ({ className, handleCancel, handleSubmitValues }: Props) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleFormikSubmit(handleSubmitValues)}
    render={renderForm(handleCancel, className)}
    validationSchema={validationSchema}
  />
);

export default BugFormik;
