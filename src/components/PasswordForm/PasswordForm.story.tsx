import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import PasswordForm from './PasswordForm';
import PasswordFormik from './PasswordFormik';

const handleCancel = action('handleCancel');
const handleSubmit = action('handleSubmit');
const handleBlur = action('handleBlur');
const handleChange = action('handleChange');

const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.COMPONENTS}PasswordForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const password = text('password', '');
    const passwordError = text('passwordError', '');
    const passwordTouched = boolean('passwordTouched', false);
    const newPassword = text('newPassword', '');
    const newPasswordError = text('newPasswordError', '');
    const newPasswordTouched = boolean('newPasswordTouched', false);
    const confirmPassword = text('confirmPassword', '');
    const confirmPasswordError = text('confirmPasswordError', '');
    const confirmPasswordTouched = boolean('confirmPasswordTouched', false);
    const isSubmitting = boolean('isSubmitting', false);
    const isValid = boolean('isValid', false);

    const values = {
      confirmPassword,
      newPassword,
      password,
    };

    const errors = {
      confirmPassword: confirmPasswordError,
      newPassword: newPasswordError,
      password: passwordError,
    };

    const touched = {
      confirmPassword: confirmPasswordTouched,
      newPassword: newPasswordTouched,
      password: passwordTouched,
    };

    return (
      <PasswordForm
        errors={errors}
        handleBlur={handleBlur}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        touched={touched}
        values={values}
      />
    );
  })
  .add('withFormik', () => {
    return <PasswordFormik handleSubmitValues={handleSubmitValues} handleCancel={handleCancel} />;
  });
