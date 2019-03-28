import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import FeedbackForm from './FeedbackForm';
import FeedbackFormik from './FeedbackFormik';

const handleBlur = action('handleBlur');
const handleChange = action('handleChange');
const handleCancel = action('handleClose');
const handleSubmit = action('handleSubmit');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.COMPONENTS}FeedbackForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const subject = text('subject', '');
    const productFeedback = text('productFeedback', '');
    const subjectError = text('subjectError', '');
    const productFeedbackError = text('productFeedbackError', '');
    const subjectTouched = boolean('subjectTouched', false);
    const productFeedbackTouched = boolean('productFeedbackTouched', false);
    const isSubmitting = boolean('isSubmitting', false);

    const values = {
      productFeedback,
      subject,
    };

    const errors = {
      productFeedback: productFeedbackError,
      subject: subjectError,
    };

    const touched = {
      productFeedback: productFeedbackTouched,
      subject: subjectTouched,
    };

    return (
      <FeedbackForm
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        touched={touched}
        values={values}
      />
    );
  })
  .add('withFormik', () => {
    return <FeedbackFormik handleCancel={handleCancel} handleSubmitValues={handleSubmitValues} />;
  });
