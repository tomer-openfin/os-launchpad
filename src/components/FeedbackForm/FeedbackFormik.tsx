import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import FeedbackForm, { Values } from './FeedbackForm';

interface Props {
  className?: string;
  handleError: () => void;
  handleSuccess: () => void;
  handleSubmitValues: (payload: string) => Promise<void>;
}

const initialValues: Values = {
  productFeedback: '',
  subject: '',
};

const validationSchema = Yup.object().shape({
  productFeedback: Yup.string().required('Required'),
  subject: Yup.string().required('Required'),
});

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  const { subject, productFeedback } = values;

  let subjectSuffix = '';
  if (window && window.location && window.location.hostname) {
    const name = window.location.hostname.split('.')[0];

    subjectSuffix = `${name}_CS-BETA-PROGRAM_[FEATURE]`;
  }

  const stringPayload = `Subject: ${subject} ${subjectSuffix}\nProduct Feedback: ${productFeedback}`;

  await handleSubmitValues(stringPayload);

  actions.setSubmitting(false);
};

const renderForm = (className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = props;

  return (
    <FeedbackForm
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

const FeedbackFormik = ({ className, handleSubmitValues }: Props) => (
  <Formik initialValues={initialValues} onSubmit={handleFormikSubmit(handleSubmitValues)} render={renderForm(className)} validationSchema={validationSchema} />
);

export default FeedbackFormik;
