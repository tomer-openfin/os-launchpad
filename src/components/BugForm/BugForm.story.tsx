import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import BugForm from './BugForm';
import BugFormik from './BugFormik';

const handleBlur = action('handleBlur');
const handleChange = action('handleChange');
const handleCancel = action('handleCancel');
const handleSubmit = action('handleSubmit');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.COMPONENTS}BugForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const subject = text('subject', '');
    const description = text('description', '');
    const steps = text('steps', '');
    const subjectError = text('subjectError', '');
    const descriptionError = text('descriptionError', '');
    const stepsError = text('stepsError', '');
    const subjectTouched = boolean('subjectTouched', false);
    const stepsTouched = boolean('stepsTouched', false);
    const descriptionTouched = boolean('descriptionTouched', false);
    const isSubmitting = boolean('isSubmitting', false);

    const values = {
      description,
      steps,
      subject,
    };

    const errors = {
      description: descriptionError,
      steps: stepsError,
      subject: subjectError,
    };

    const touched = {
      description: descriptionTouched,
      steps: stepsTouched,
      subject: subjectTouched,
    };

    return (
      <BugForm
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
    return <BugFormik handleCancel={handleCancel} handleSubmitValues={handleSubmitValues} />;
  });
