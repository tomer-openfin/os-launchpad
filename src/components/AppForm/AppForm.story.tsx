import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import AppForm, { Values } from './AppForm';
import AppFormik from './AppFormik';

const handleCancel = action('handleCancel');
const handleSubmit = action('handleSubmit');
const handleBlur = action('handleBlur');
const handleChange = action('handleChange');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.ADMIN}AppForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const url = text('url', '');
    const urlError = text('urlError', '');
    const urlTouched = boolean('urlTouched', false);
    const description = text('description', '');
    const descriptionError = text('descriptionError', '');
    const descriptionTouched = boolean('descriptionTouched', false);
    const name = text('name', '');
    const nameError = text('nameError', '');
    const nameTouched = boolean('nameTouched', false);
    const title = text('title', '');
    const titleError = text('titleError', '');
    const titleTouched = boolean('titleTouched', false);
    const isSubmitting = boolean('isSubmitting', false);
    const isValid = boolean('isValid', false);
    const manifestType = select('manifestType', { manifest: 'manifest', appURL: 'appUrl' }, 'appUrl');

    const values: Values = {
      description,
      icon: '',
      id: '',
      manifestType,
      name,
      title,
      url,
    };

    const errors = {
      description: descriptionError,
      name: nameError,
      title: titleError,
      url: urlError,
    };

    const touched = {
      description: descriptionTouched,
      name: nameTouched,
      title: titleTouched,
      url: urlTouched,
    };

    return (
      <AppForm
        errors={errors}
        handleBlur={handleBlur}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        touched={touched}
        values={values}
      />
    );
  })
  .add('withFormik', () => {
    return <AppFormik handleSubmitValues={handleSubmitValues} handleCancel={handleCancel} />;
  });
