import { connect } from 'react-redux';

import { getIsAdmin, getLauncherPosition } from '../../redux/me';
import { State } from '../../redux/types';
import { launchWindow, WindowConfig } from '../../redux/windows';
import withAutoHideApp from './withAutoHideApp';

import App from './App';

const mapState = (state: State) => ({
  isAdmin: getIsAdmin(state),
  launcherPosition: getLauncherPosition(state),
});

const mapDispatch = dispatch => ({
  launchWindow: (window: WindowConfig) => dispatch(launchWindow(window)),
});

export default withAutoHideApp(
  connect(
    mapState,
    mapDispatch,
  )(App),
);
