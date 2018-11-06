import { Window } from '@giantmachines/redux-openfin';
import { combineReducers } from 'redux';

import application from './application';
import layouts from './layouts';
import me from './me';
import { State } from './types';

export default combineReducers<State>({
  application,
  layouts,
  me,
  windows: Window.reducer,
});
