import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import ForgotPasswordChangeForm from './ForgotPasswordChangeForm';
import ForgotPasswordChangeFormik from './ForgotPasswordChangeFormik';

const handleBlur = action('handleBlur');
const handleChange = action('handleChange');
const handleSubmit = action('handleSubmit');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.COMPONENTS}ForgotPasswordChangeForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(30))
  .add('default', () => {
    const code = text('code', '');
    const codeError = text('codeError', '');
    const codeTouched = boolean('codeTouched', false);
    const password = text('password', '');
    const passwordError = text('passwordError', '');
    const passwordTouched = boolean('passwordTouched', false);
    const confirmPassword = text('confirmPassword', '');
    const confirmPasswordError = text('confirmPasswordError', '');
    const confirmPasswordTouched = boolean('confirmPasswordTouched', false);
    const isSubmitting = boolean('isSubmitting', false);

    const values = {
      code,
      confirmPassword,
      password,
    };
    const errors = {
      code: codeError,
      confirmPassword: confirmPasswordError,
      password: passwordError,
    };
    const touched = {
      code: codeTouched,
      confirmPassword: confirmPasswordTouched,
      password: passwordTouched,
    };

    return (
      <ForgotPasswordChangeForm
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
    return <ForgotPasswordChangeFormik handleSubmitValues={handleSubmitValues} />;
  });
