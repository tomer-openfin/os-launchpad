import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import PasswordFormik, { Values } from './PasswordForm';

const handleCancel = action('handleCancel');
const handleSubmit = action('handleSubmit');

const initialValues: Values = {
  confirmPassword: '',
  newPassword: '',
  password: '',
};

storiesOf(`${CATEGORIES.COMPONENTS}PasswordForm`, module)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    return <PasswordFormik handleSubmitValues={handleSubmit} handleCancel={handleCancel} initialValues={initialValues} />;
  });
