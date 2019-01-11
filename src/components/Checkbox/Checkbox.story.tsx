import { Formik } from 'formik';
import * as React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { CATEGORIES } from '../../utils/storyCategories';

import noop from '../../utils/noop';
import Checkbox from './Checkbox';

const FormikCheckbox = ({ label, name }) => ({ values }) => <Checkbox name={name} label={label} checked={values[name]} />;

const FormikCheckboxForm = ({ label, name }) => <Formik initialValues={{ [name]: false }} render={FormikCheckbox({ label, name })} onSubmit={noop} />;

storiesOf(`${CATEGORIES.UI}Checkbox`, module)
  .addDecorator(withKnobs)
  .add('default', () => <FormikCheckboxForm label="Checkbox" name="checkbox" />)
  .add('with knobs', () => {
    const label = text('Label Text', 'Place Text Here');

    return <FormikCheckboxForm label={label} name="checkbox" />;
  });
