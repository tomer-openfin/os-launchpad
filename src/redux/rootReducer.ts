import { Window } from '@giantmachines/redux-openfin';
import { combineReducers } from 'redux';

import me from './me';
import { State } from './types';

export default combineReducers<State>({
  me,
  windows: Window.reducer,
});
