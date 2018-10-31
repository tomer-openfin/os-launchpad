import { combineReducers } from 'redux';

import me from './me';
import { State } from './types';

export default combineReducers<State>({
  me,
});
