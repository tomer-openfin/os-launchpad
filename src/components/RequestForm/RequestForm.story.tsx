import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { sharedAdminFormsCSSTransitionProps } from '../../utils/adminForms';
import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import { AddEditWrapper } from '../AdminUsers';
import AppForm from '../AppForm';
import UserForm from '../UserForm';
import RequestForm from './RequestForm';

const handleCancel = action('handleCancel');
const renderUserForm = (formikProps: FormikProps<FormikValues>) => <UserForm {...formikProps} handleCancel={handleCancel} />;
const renderAppForm = (formikProps: FormikProps<FormikValues>) => <AppForm {...formikProps} handleCancel={handleCancel} />;

storiesOf(`${CATEGORIES.ADMIN}RequestForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const createApp = action('createApp');
    const createUser = action('createUser');
    const errorMessage = text('Error Message', 'Failed to create');
    const form = select('Form', { 'App Form': 0, 'User Form': 1 }, 0);
    const headingText = text('Heading Text', 'Create App');

    return (
      <RequestForm
        errorMessage={errorMessage}
        render={form ? renderUserForm : renderAppForm}
        headingText={headingText}
        initialValues={{}}
        onSubmitSuccess={noop}
        submit={form ? createUser : createApp}
      />
    );
  })
  .add('with animations', () => {
    const createUser = action('createUser');
    const errorMessage = text('Error Message', 'Failed to create');
    const headingText = text('Heading Text', 'Create User');
    const isMounted = boolean('isMounted', false);

    return (
      <CSSTransition in={isMounted} {...sharedAdminFormsCSSTransitionProps}>
        <AddEditWrapper>
          <RequestForm
            errorMessage={errorMessage}
            render={renderUserForm}
            headingText={headingText}
            initialValues={{}}
            onSubmitSuccess={noop}
            submit={createUser}
          />
        </AddEditWrapper>
      </CSSTransition>
    );
  });
