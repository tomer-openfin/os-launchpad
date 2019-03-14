import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import { ResponseObject } from '../../types/commons';

import EditUserWindow from './EditUserWindow';

const user = UserData[0];

const onEscDown = action('onEscDown');
const updateUser = action('updateUser');
const handleCancel = action('handleCancel');
const handleDelete = action('handleDelete');
const handleSuccess = action('handleSuccess');

const onResponseErrorNoop = (callback?: () => void) => (message: string) => {
  return;
};
const onResponseSuccessNoop = (callback?: () => void) => (resp: ResponseObject) => {
  return;
};

let isClosed = true;

storiesOf(`${CATEGORIES.ADMIN}EditUserWindow`, module)
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
      <EditUserWindow
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
        updateUser={updateUser}
        user={user}
        userId={user.id}
      />
    );
  });
