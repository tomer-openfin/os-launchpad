import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import ChangePasswordForm from './ChangePasswordForm';
import ChangePasswordFormik from './ChangePasswordFormik';

const handleBlur = action('handleBlur');
const handleChange = action('handleChange');
const handleSubmit = action('handleSubmit');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.COMPONENTS}ChangePasswordForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const newPassword = text('newPassword', '');
    const newPasswordError = text('newPasswordError', '');
    const newPasswordTouched = boolean('newPasswordTouched', false);
    const confirmPassword = text('confirmPassword', '');
    const confirmPasswordError = text('confirmPasswordError', '');
    const confirmPasswordTouched = boolean('confirmPasswordTouched', false);
    const isSubmitting = boolean('isSubmitting', false);

    const values = {
      confirmPassword,
      newPassword,
    };
    const errors = {
      confirmPassword: confirmPasswordError,
      newPassword: newPasswordError,
    };
    const touched = {
      confirmPassword: confirmPasswordTouched,
      newPassword: newPasswordTouched,
    };

    return (
      <ChangePasswordForm
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        touched={touched}
        values={values}
      />
    );
  })
  .add('withFormik', () => {
    return <ChangePasswordFormik handleSubmitValues={handleSubmitValues} />;
  });
