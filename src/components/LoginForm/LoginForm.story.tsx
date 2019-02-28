import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import LoginForm from './LoginForm';
import LoginFormik from './LoginFormik';

const handleBlur = action('handleBlur');
const handleChange = action('handleChange');
const handleSubmit = action('handleSubmit');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.COMPONENTS}LoginForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const username = text('username', '');
    const usernameError = text('usernameError', '');
    const usernameTouched = boolean('usernameTouched', false);
    const password = text('password', '');
    const passwordError = text('passwordError', '');
    const passwordTouched = boolean('usernameTouched', false);
    const isSubmitting = boolean('isSubmitting', false);

    const values = {
      password,
      username,
    };
    const errors = {
      password: passwordError,
      username: usernameError,
    };
    const touched = {
      password: passwordTouched,
      username: usernameTouched,
    };

    return (
      <LoginForm
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
    return <LoginFormik handleSubmitValues={handleSubmitValues} />;
  });
