import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import ForgotPasswordRequestForm from './ForgotPasswordRequestForm';
import ForgotPasswordRequestFormik from './ForgotPasswordRequestFormik';

const handleBlur = action('handleBlur');
const handleChange = action('handleChange');
const handleSubmit = action('handleSubmit');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.COMPONENTS}ForgotPasswordRequestForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const username = text('username', '');
    const errorMessage = text('errorMessage', '');
    const touched = boolean('touched', false);
    const isSubmitting = boolean('isSubmitting', false);

    return (
      <ForgotPasswordRequestForm
        errors={{ username: errorMessage }}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        touched={{ username: touched }}
        values={{ username }}
      />
    );
  })
  .add('withFormik', () => {
    return <ForgotPasswordRequestFormik handleSubmitValues={handleSubmitValues} />;
  });
