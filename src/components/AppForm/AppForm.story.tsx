import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import AppForm, { ManifestType, Values } from './AppForm';
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
    const description = text('description', '');
    const descriptionError = text('descriptionError', '');
    const descriptionTouched = boolean('descriptionTouched', false);
    const isSubmitting = boolean('isSubmitting', false);
    const isValid = boolean('isValid', false);
    const manifestType = select('manifestType', Object(ManifestType), ManifestType.AppUrl);
    const name = text('name', '');
    const nameError = text('nameError', '');
    const nameTouched = boolean('nameTouched', false);
    const setFieldValue = action('setFieldValue');
    const title = text('title', '');
    const titleError = text('titleError', '');
    const titleTouched = boolean('titleTouched', false);
    const appUrl = text('appUrl', '');
    const appUrlError = text('appUrlError', '');
    const appUrlTouched = boolean('appUrlTouched', false);
    const manifestUrl = text('manifestUrl', '');
    const manifestUrlError = text('manifestUrlError', '');
    const manifestUrlTouched = boolean('manifestUrlTouched', false);

    const values: Values = {
      appUrl,
      description,
      icon: '',
      id: '',
      manifestType,
      manifestUrl,
      name,
      title,
    };

    const errors = {
      appUrl: appUrlError,
      description: descriptionError,
      manifestUrl: manifestUrlError,
      name: nameError,
      title: titleError,
    };

    const touched = {
      appUrl: appUrlTouched,
      description: descriptionTouched,
      manifestUrl: manifestUrlTouched,
      name: nameTouched,
      title: titleTouched,
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
        setFieldValue={setFieldValue}
        touched={touched}
        values={values}
      />
    );
  })
  .add('withFormik', () => {
    return <AppFormik handleSubmitValues={handleSubmitValues} handleCancel={handleCancel} />;
  });
