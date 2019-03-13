import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { ResponseObject } from '../../types/commons';
import NewAppWindow from './NewAppWindow';

const handleCancel = action('handleCancel');
const handleSuccess = action('handleSuccess');
const onEscDown = action('onEscDown');
const createApp = action('createApp');

const onResponseErrorNoop = (callback?: () => void) => (message: string) => {
  return;
};
const onResponseSuccessNoop = (callback?: () => void) => (resp: ResponseObject) => {
  return;
};

let isClosed = true;

storiesOf(`${CATEGORIES.ADMIN}NewAppWindow`, module)
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

    return (
      <NewAppWindow
        createApp={createApp}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
        onEscDown={onEscDown}
        onResponseError={onResponseErrorNoop}
        onResponseSuccess={onResponseSuccessNoop}
        resetResponseError={reset}
        responseError={error}
        responseMessage={errorMessage}
        responsePayload={{}}
      />
    );
  });
