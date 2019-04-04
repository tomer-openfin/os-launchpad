import { AnyAction, combineReducers } from 'redux';

import admin from './admin';
import application from './application';
import apps from './apps';
import contextMenu from './contextMenu';
import layouts from './layouts';
import me from './me';
import organization from './organization';
import system from './system';
import windows from './windows';

import { State } from './types';
import { createAction } from './utils';

const RESET_STORE = 'RESET_STORE';
export const resetStore = createAction(RESET_STORE)<void>();

export default (state: State | undefined, action: AnyAction) => {
  return combineReducers<State>({
    admin,
    application,
    apps,
    contextMenu,
    layouts,
    me,
    organization,
    system,
    windows,
  })(action.type === resetStore.toString() ? undefined : state, action);
};
