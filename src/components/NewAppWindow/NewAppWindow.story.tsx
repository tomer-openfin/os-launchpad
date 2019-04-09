import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { sharedAdminFormsCSSTransitionProps } from '../../utils/adminForms';
import { CATEGORIES } from '../../utils/storyCategories';

import { Stage } from '../AdminApps';
import { AddEditWrapper } from '../AdminUsers';
import NewAppWindow from './NewAppWindow';

const handleCancel = action('handleCancel');
const handleSuccess = action('handleSuccess');
const onEscDown = action('onEscDown');
const createApp = action('createApp');

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

storiesOf(`${CATEGORIES.ADMIN}NewAppWindow`, module)
  .addDecorator(withKnobs)
  .add('default', () => {

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
      />
    );
  }).add('withAnimations', () => {
    const currentAction = select('currentAction', Object(Stage), Stage.New);
    const isMounted = boolean('isMounted', false);

    return (
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition in={currentAction === Stage.New} {...sharedAdminFormsCSSTransitionProps}>
            <AddEditWrapper>
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
              />
            </AddEditWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  });
