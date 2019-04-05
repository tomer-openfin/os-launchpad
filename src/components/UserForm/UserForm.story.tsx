import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import UserForm from './UserForm';
import UserFormik from './UserFormik';
import { editUserSchema, newUserSchema } from './utils';

const handleCancel = action('handleCancel');
const handleSubmit = action('handleSubmit');
const handleBlur = action('handleBlur');
const handleChange = action('handleChange');

const handleSubmitValues = action('handleSubmitValues');
const withPasswordField = boolean('withPasswordField', false);

storiesOf(`${CATEGORIES.ADMIN}UserForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const email = text('email', '');
    const emailError = text('emailError', '');
    const emailTouched = boolean('emailTouched', false);
    const firstName = text('firstName', '');
    const firstNameError = text('firstNameError', '');
    const firstNameTouched = boolean('firstNameTouched', false);
    const lastName = text('lastName', '');
    const lastNameError = text('lastNameError', '');
    const lastNameTouched = boolean('lastNameTouched', false);
    const middleInitial = text('middleInitial', '');
    const middleInitialError = text('middleInitialError', '');
    const middleInitialTouched = boolean('middleInitialTouched', false);
    const phone = text('phone', '');
    const phoneError = text('phoneError', '');
    const phoneTouched = boolean('phoneTouched', false);
    const tmpPassword = text('tmpPassword', '');
    const tmpPasswordError = text('tmpPasswordError', '');
    const tmpPasswordTouched = boolean('tmpPasswordTouched', false);
    const isSubmitting = boolean('isSubmitting', false);
    const isValid = boolean('isValid', false);

    const values = {
      email,
      firstName,
      id: '',
      lastName,
      middleInitial,
      phone,
      tmpPassword,
      username: '',
    };

    const errors = {
      email: emailError,
      firstName: firstNameError,
      lastName: lastNameError,
      middleInitial: middleInitialError,
      phone: phoneError,
      tmpPassword: tmpPasswordError,
    };

    const touched = {
      email: emailTouched,
      firstName: firstNameTouched,
      lastName: lastNameTouched,
      middleInitial: middleInitialTouched,
      phone: phoneTouched,
      tmpPassword: tmpPasswordTouched,
    };

    return (
      <UserForm
        errors={errors}
        handleBlur={handleBlur}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        touched={touched}
        values={values}
        withPasswordField={withPasswordField}
      />
    );
  })
  .add('withFormik', () => {
    return (
      <UserFormik handleSubmitValues={handleSubmitValues} handleCancel={handleCancel} validationSchema={withPasswordField ? newUserSchema : editUserSchema} />
    );
  });
