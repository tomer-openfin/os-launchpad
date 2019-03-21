import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import FeedbackForm, { Values } from './FeedbackForm';

interface Props {
  className?: string;
  handleSubmitValues: (payload: Values) => Promise<void>;
}

const initialValues: Values = {
  productFeedback: '',
  subject: '',
};
