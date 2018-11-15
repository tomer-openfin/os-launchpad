import { connect } from 'react-redux';

import { getLauncherPosition } from '../../redux/me';
import { State } from '../../redux/types';
import { launchWindow, WindowConfig } from '../../redux/windows';
import withAutoHideApp from './withAutoHideApp';

import App from './App';

const mapState = (state: State) => ({
  launcherPosition: getLauncherPosition(state),
});

const mapDispatch = dispatch => ({
  launchWindow: (window: WindowConfig) => dispatch(launchWindow(window)),
});

export default withAutoHideApp(connect(
  mapState,
  mapDispatch,
)(App));
