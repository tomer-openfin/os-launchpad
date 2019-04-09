import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { sharedAdminFormsCSSTransitionProps } from '../../utils/adminForms';

import { AddEditWrapper, Stage } from '../AdminUsers';
import NewUserWindow from './NewUserWindow';

const handleCancel = action('handleCancel');
const handleSuccess = action('handleSuccess');
const createUser = action('createUser');
const onEscDown = action('onEscDown');

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

storiesOf(`${CATEGORIES.ADMIN}NewUserWindow`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <NewUserWindow
        createUser={createUser}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
        onEscDown={onEscDown}
        onResponseError={onResponseErrorNoop}
        onResponseSuccess={onResponseSuccessNoop}
        resetResponseError={reset}
        responseError={error}
        responseMessage={errorMessage}
      />
    );
  })
  .add('withAnimations', () => {
    const currentAction = select('currentAction', Object(Stage), Stage.New);
    const isMounted = boolean('isMounted', false);

    return (
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition in={currentAction === Stage.New} {...sharedAdminFormsCSSTransitionProps}>
            <AddEditWrapper>
              <NewUserWindow
                createUser={createUser}
                handleCancel={handleCancel}
                handleSuccess={handleSuccess}
                onEscDown={onEscDown}
                onResponseError={onResponseErrorNoop}
                onResponseSuccess={onResponseSuccessNoop}
                resetResponseError={reset}
                responseError={error}
                responseMessage={errorMessage}
              />
            </AddEditWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  });
