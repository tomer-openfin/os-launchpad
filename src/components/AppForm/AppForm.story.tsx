import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import AppForm from './AppForm';

storiesOf(`${CATEGORIES.ADMIN}AppForm`, module).add('default', () => (
  <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} component={AppForm} />
));
