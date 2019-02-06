import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import AppForm from '../AppForm';
import UserForm from '../UserForm';
import RequestForm from './RequestForm';

const createApp = action('createApp');
const createUser = action('createUser');

storiesOf(`${CATEGORIES.ADMIN}RequestForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const errorMessage = text('Error Message', 'Failed to create');
    const headingText = text('Heading Text', 'Create App');
    const form = select('Form', { 'App Form': 0, 'User Form': 1 }, 0);

    return (
      <RequestForm
        errorMessage={errorMessage}
        form={form ? UserForm : AppForm}
        headingText={headingText}
        initialValues={{}}
        onSubmitSuccess={noop}
        submit={form ? createUser : createApp}
      />
    );
  });
