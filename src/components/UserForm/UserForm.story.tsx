import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import UserForm from './UserForm';

const handleCancel = action('handleCancel');
const onSubmit = action('onSubmit');

const renderUserForm = ({ isSubmitting, isValid }) => <UserForm isSubmitting={isSubmitting} isValid={isValid} handleCancel={handleCancel} />;

storiesOf(`${CATEGORIES.ADMIN}UserForm`, module).add('default', () => (
  <Formik initialValues={{}} onSubmit={onSubmit} validateOnChange={false} render={renderUserForm} />
));
