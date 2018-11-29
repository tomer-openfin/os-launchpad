import { Window } from '@giantmachines/redux-openfin';
import { combineReducers } from 'redux';

import admin from './admin';
import application from './application';
import apps from './apps';
import contextMenu from './contextMenu';
import layouts from './layouts';
import me from './me';
import organization from './organization';
import system from './system';
import { State } from './types';

export default combineReducers<State>({
  admin,
  application,
  apps,
  contextMenu,
  layouts,
  me,
  organization,
  system,
  windows: Window.reducer,
});
