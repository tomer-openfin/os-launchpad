import { Formik } from 'formik';
import * as React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { CATEGORIES } from '../../utils/storyCategories';

import noop from '../../utils/noop';
import RadioToggle from './RadioToggle';

const FormikRadioToggle = ({ label, name }) => ({ values }) => <RadioToggle name={name} label={label} value={values[name]} />;

const FormikRadioToggleForm = ({ label, name }) => <Formik initialValues={{ [name]: false }} render={FormikRadioToggle({ label, name })} onSubmit={noop} />;

storiesOf(`${CATEGORIES.UI}RadioToggle`, module)
  .addDecorator(withKnobs)
  .add('default', () => <FormikRadioToggleForm label="RadioToggle" name="RadioToggle" />)
  .add('with knobs', () => {
    const label = text('Label Text', 'Place Text Here');

    return <FormikRadioToggleForm label={label} name="RadioToggle" />;
  });
