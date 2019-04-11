import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import UserData from '../../samples/UserData';
import { sharedAdminFormsCSSTransitionProps } from '../../utils/adminForms';
import { CATEGORIES } from '../../utils/storyCategories';

import { AddEditWrapper, Stage } from '../AdminUsers';
import EditUserWindow from './EditUserWindow';

const user = UserData[0];

const onEscDown = action('onEscDown');
const updateUser = action('updateUser');
const handleCancel = action('handleCancel');
const handleDelete = action('handleDelete');
const handleSuccess = action('handleSuccess');

const onResponseErrorNoop = (callback?: () => void) => (e?: Error) => {
  return;
};
const onResponseSuccessNoop = (callback?: () => void) => () => {
  return;
};

let isClosed = true;

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

storiesOf(`${CATEGORIES.ADMIN}EditUserWindow`, module)
  .addDecorator(withKnobs)
  .add('default', () => {

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
        updateUser={updateUser}
        user={user}
        userId={user.id}
      />
    );
  })
  .add('withAnimations', () => {
    const currentAction = select('currentAction', Object(Stage), Stage.Edit);
    const isMounted = boolean('isMounted', false);

    return (
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition in={currentAction === Stage.Edit} {...sharedAdminFormsCSSTransitionProps}>
            <AddEditWrapper>
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
                 updateUser={updateUser}
                 user={user}
                 userId={user.id}
              />
            </AddEditWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  });
