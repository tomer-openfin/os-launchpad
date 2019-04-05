import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import UpdatePasswordForm from './UpdatePasswordForm';

const updatePassword = action('updatePassword');

const onResponseErrorNoop = (callback?: () => void) => (error?: Error) => {
  return;
};
const onResponseSuccessNoop = (callback?: () => void) => () => {
  return;
};

let isClosed = true;

storiesOf(`${CATEGORIES.COMPONENTS}UpdatePasswordForm`, module)
  .addDecorator(withMarginDecorator())
  .addDecorator(withKnobs)
  .add('default', () => {
    const reset = () => {
      isClosed = true;
      forceReRender();
    };
    const handleOpen = () => {
      isClosed = false;
      forceReRender();
    };

    const error = boolean('Error', !isClosed);

    if (error && isClosed) handleOpen();

    const errorMessage = text('Error Message', 'Failed to create');
    const handleCancel = action('handleCancel');
    const handleConfirm = action('handleConfirm');
    const handleSuccess = action('handleSuccess');

    return (
      <UpdatePasswordForm
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        handleSuccess={handleSuccess}
        updatePassword={updatePassword}
        onResponseError={onResponseErrorNoop}
        onResponseSuccess={onResponseSuccessNoop}
        resetResponseError={reset}
        responseError={error}
        responseMessage={errorMessage}
      />
    );
  });
