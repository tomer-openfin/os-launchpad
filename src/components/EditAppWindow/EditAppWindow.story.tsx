import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AppData from '../../samples/AppData';
import { sharedAdminFormsCSSTransitionProps } from '../../utils/adminForms';
import { CATEGORIES } from '../../utils/storyCategories';

import { Stage } from '../AdminApps';
import { AddEditWrapper } from '../AdminUsers';
import EditAppWindow from './EditAppWindow';

const app = AppData[0];

const handleCancel = action('handleCancel');
const handleDelete = action('handleDelete');
const handleSuccess = action('handleSuccess');
const onEscDown = action('onEscDown');
const updateApp = action('updateApp');

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

storiesOf(`${CATEGORIES.ADMIN}EditAppWindow`, module)
  .addDecorator(withKnobs)
  .add('default', () => {

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
        updateApp={updateApp}
      />
    );
  }).add('withAnimations', () => {
    const currentAction = select('currentAction', Object(Stage), Stage.Edit);
    const isMounted = boolean('isMounted', false);

    return (
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition in={currentAction === Stage.Edit} {...sharedAdminFormsCSSTransitionProps}>
            <AddEditWrapper>
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
                 updateApp={updateApp}
              />
            </AddEditWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  });
