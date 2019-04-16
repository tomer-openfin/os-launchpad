import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';

import { User, UserFormData, YesNo } from '../../types/commons';
import { CATEGORIES } from '../../utils/storyCategories';
import { ManifestType } from '../AppForm';

import AppFormik from '../AppForm/AppFormik';
import UserFormik, { newUserSchema } from '../UserForm';
import FormWindow from './FormWindow';

const handleCancel = action('handleCancel');
const handleSubmit = action('handleSubmit');

const emptyUser: UserFormData = {
  email: '',
  firstName: '',
  id: '',
  isAdmin: YesNo.No,
  lastName: '',
  middleName: '',
  phone: '',
  tmpPassword: '',
  username: '',
};

const emptyApp = {
  appUrl: '',
  contexts: [],
  description: '',
  icon: '',
  id: '',
  images: [],
  intents: [],
  manifestType: ManifestType.AppUrl,
  manifest_url: '',
  name: '',
  title: '',
};

let isClosed = true;

storiesOf(`${CATEGORIES.COMPONENTS}FormWindow`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const reset = () => {
      isClosed = true;
      forceReRender();
    };
    const handleOpen = () => {
      isClosed = false;
      forceReRender();
    };

    const error = boolean('Error', !isClosed);

    if (error && isClosed) handleOpen();

    const errorMessage = text('Error Message', 'Failed to create');
    const headingText = text('Heading Text', 'Create App');
    const form = select('Form', { 'App Form': 0, 'User Form': 1 }, 0);

    return (
      <FormWindow message={errorMessage} headingText={headingText} responseError={error} resetResponseError={reset}>
        {form ? (
          <UserFormik
            handleSubmitValues={handleSubmit}
            handleCancel={handleCancel}
            initialValues={emptyUser}
            withPasswordField={true}
            validationSchema={newUserSchema}
          />
        ) : (
          <AppFormik handleSubmitValues={handleSubmit} handleCancel={handleCancel} initialValues={emptyApp} />
        )}
      </FormWindow>
    );
  });
