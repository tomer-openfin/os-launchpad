import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import UserForm from './UserForm';

storiesOf(`${CATEGORIES.ADMIN}UserForm`, module).add('default', () => <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={UserForm} />);
