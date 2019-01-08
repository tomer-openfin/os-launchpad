import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import FormField from './FormField';

const renderEmailField = ({ isSubmitting, isValid }) => (
  <FormField type={'text'} name={'email'} validate={noop} placeholder={'Enter Email'} disabled={false} label={'Email'} />
);
const renderPasswordField = ({ isSubmitting, isValid }) => (
  <FormField type={'password'} name={'password'} validate={noop} placeholder={'Enter Password'} disabled={false} label={'Password'} />
);
const renderTextAreaField = ({ isSubmitting, isValid }) => (
  <FormField type={'text'} component="textarea" name={'description'} validate={noop} placeholder={'Enter Description'} disabled={false} label={'Description'} />
);

storiesOf(`${CATEGORIES.UI}FormField`, module)
  .add('Default', () => <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderEmailField} />)
  .add('Password', () => <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderPasswordField} />)
  .add('Text Area', () => <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderTextAreaField} />);
