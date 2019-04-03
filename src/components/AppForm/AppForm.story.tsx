import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import AppForm from './AppForm';
// import AppFormik from './AppFormik';

const handleCancel = action('handleCancel');
const handleSubmit = action('handleSubmit');
const handleBlur = action('handleBlur');
const handleChange = action('handleChange');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.ADMIN}AppForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const appUrl = text('appUrl', '');
    const appUrlError = text('appUrlError', '');
    const appUrlTouched = boolean('appUrlTouched', false);
    const description = text('description', '');
    const descriptionError = text('descriptionError', '');
    const descriptionTouched = boolean('descriptionTouched', false);
    // tslint:disable-next-line:variable-name
    const manifest_url = text('manifest_url', '');
    // tslint:disable-next-line:variable-name
    const manifest_urlError = text('manifest_urlError', '');
    // tslint:disable-next-line:variable-name
    const manifest_urlTouched = boolean('manifest_urlTouched', false);
    const name = text('name', '');
    const nameError = text('nameError', '');
    const nameTouched = boolean('nameTouched', false);
    const title = text('title', '');
    const titleError = text('titleError', '');
    const titleTouched = boolean('titleTouched', false);
    const isSubmitting = boolean('isSubmitting', false);
    const isValid = boolean('isValid', false);

    const values = {
      appUrl,
      description,
      icon: '',
      id: '',
      manifest_url,
      name,
      title,
    };

    const errors = {
      appUrl: appUrlError,
      description: descriptionError,
      manifest_url: manifest_urlError,
      name: nameError,
      title: titleError,
    };

    const touched = {
      appUrl: appUrlTouched,
      description: descriptionTouched,
      manifest_url: manifest_urlTouched,
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
        touched={touched}
        values={values}
      />
    );
  });
// .add('withFormik', () => {
//   return <AppFormik handleSubmitValues={handleSubmitValues} handleCancel={handleCancel} />;
// });
