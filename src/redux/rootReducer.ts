import { combineReducers } from 'redux';

import admin from './admin';
import application from './application';
import apps from './apps';
import channels from './channels';
import contextMenu from './contextMenu';
import layouts from './layouts';
import me from './me';
import organization from './organization';
import system from './system';
import windows from './windows';

import { DeepReadonly } from '../types/utils';
import { State } from './types';

export default combineReducers<DeepReadonly<State>>({
  admin,
  application,
  apps,
  channels,
  contextMenu,
  layouts,
  me,
  organization,
  system,
  windows,
});
