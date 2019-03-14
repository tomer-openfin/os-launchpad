import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import { ResponseObject } from '../../types/commons';

import EditAppWindow from './EditAppWindow';

const app = AppData[0];

const handleCancel = action('handleCancel');
const handleDelete = action('handleDelete');
const handleSuccess = action('handleSuccess');
const onEscDown = action('onEscDown');
const updateApp = action('updateApp');

const onResponseErrorNoop = (callback?: () => void) => (message: string) => {
  return;
};
const onResponseSuccessNoop = (callback?: () => void) => (resp: ResponseObject) => {
  return;
};

let isClosed = true;

storiesOf(`${CATEGORIES.ADMIN}EditAppWindow`, module)
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
      <EditAppWindow
        appId={app.id}
        app={app}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        handleSuccess={handleSuccess}
        onEscDown={onEscDown}
        onResponseError={onResponseErrorNoop}
        onResponseSuccess={onResponseSuccessNoop}
        resetResponseError={reset}
        responseError={error}
        responseMessage={errorMessage}
        responsePayload={{}}
        updateApp={updateApp}
      />
    );
  });
