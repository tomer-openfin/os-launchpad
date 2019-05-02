import { connect } from 'react-redux';
import { Action } from 'redux';

import { getLauncherPosition, getLauncherSizeConfig } from '../../redux/me';
import { getSystemDrawerSize } from '../../redux/selectors';
import { State } from '../../redux/types';

import App from './App';

const mapState = (state: State) => ({
  launcherPosition: getLauncherPosition(state),
  launcherSizeConfig: getLauncherSizeConfig(state),
  systemDrawerSize: getSystemDrawerSize(state),
});

const mapDispatch = dispatch => ({
  dispatch: (action: Action) => dispatch(action),
});

export default connect(
  mapState,
  mapDispatch,
)(App);
