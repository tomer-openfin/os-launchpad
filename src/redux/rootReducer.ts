import { Window } from '@giantmachines/redux-openfin';
import { combineReducers } from 'redux';

import application from './application';
import apps from './apps';
import layouts from './layouts';
import me from './me';
import { State } from './types';

export default combineReducers<State>({
  application,
  apps,
  layouts,
  me,
  windows: Window.reducer,
});
