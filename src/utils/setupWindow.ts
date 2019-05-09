import { all, call, put } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW, CHANNELS_WINDOW } from '../config/windows';
import { animateChannels } from '../redux/channels';
import { windowBlurred, windowBoundsChanged, windowClosed, windowHidden, windowShown } from '../redux/windows';
import { Identity, WindowBaseEvent, WindowBoundsEvent } from '../types/commons';
import { addWindowListener, removeWindowListener } from './finUtils';

const blurredHandler = ({ name, uuid }: WindowBaseEvent) => {
  window.store.dispatch(windowBlurred({ name, uuid }));
};
const boundsChangedHandler = ({ height, left, name, top, uuid, width }: WindowBoundsEvent) => {
  window.store.dispatch(windowBoundsChanged({ identity: { name, uuid }, bounds: { height, left, top, width } }));
};
const hiddenHandler = ({ name, uuid }: WindowBaseEvent) => {
  window.store.dispatch(windowHidden({ name, uuid }));
};
const shownHandler = ({ name, uuid }: WindowBaseEvent) => {
  window.store.dispatch(windowShown({ name, uuid }));
};

export function* setupWindow(identity: Identity) {
  const eventHandlers = [{ type: 'blurred', handler: blurredHandler }, { type: 'bounds-changed', handler: boundsChangedHandler }];

  // Track every windows hide and show state
  // Except for APP_LAUNCHER_OVERFLOW_WINDOW since its hide/show is based on opacity
  if (identity.name === APP_LAUNCHER_OVERFLOW_WINDOW) {
    yield put(windowHidden(identity));
  } else {
    eventHandlers.push({ type: 'hidden', handler: hiddenHandler });
    eventHandlers.push({ type: 'shown', handler: shownHandler });
  }

  yield all(eventHandlers.map(({ type, handler }) => call(addWindowListener(identity), type, handler)));
  const closedHandler = ({ name, uuid }: WindowBaseEvent) => {
    window.store.dispatch(windowClosed({ name, uuid }));
    eventHandlers.forEach(({ type, handler }) => removeWindowListener(identity)(type, handler));
    removeWindowListener(identity)('closed', closedHandler);
  };
  yield call(addWindowListener(identity), 'closed', closedHandler);

  if (identity.name === CHANNELS_WINDOW) {
    yield put(animateChannels.request({ animateInstant: true }));
  }
}
