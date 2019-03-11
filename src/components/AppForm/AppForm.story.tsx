import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Formik, FormikProps, FormikValues } from 'formik';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import AppForm from './AppForm';

const handleCancel = action('handleCancel');

storiesOf(`${CATEGORIES.ADMIN}AppForm`, module).add('default', () => {
  const renderAppForm = (formikProps: FormikProps<FormikValues>) => <AppForm {...formikProps} handleCancel={handleCancel} />;

  return <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderAppForm} />;
});
