import { connect } from 'react-redux';

import { getWindowBounds, launchWindow, WindowConfig } from '../../redux/windows';

import { collapseApp, expandApp, getApplicationIsExpanded } from '../../redux/application';
import { getAutoHide } from '../../redux/me';
import { getSystemMonitorInfo, setMonitorInfo } from '../../redux/system';
import { State } from '../../redux/types';
import getAppUuid from '../../utils/getAppUuid';

import App from './App';

const APP_UUID = getAppUuid();

const mapState = (state: State) => ({
  autoHide: getAutoHide(state),
  bounds: getWindowBounds(state, APP_UUID),
  isExpanded: getApplicationIsExpanded(state),
  launcherPosition: state.me.settings.launcherPosition,
  monitorInfo: getSystemMonitorInfo(state),
});

const mapDispatch = dispatch => ({
  collapseApp: () => dispatch(collapseApp()),
  expandApp: () => dispatch(expandApp()),
  launchWindowCreator: (window: WindowConfig) => () => dispatch(launchWindow(window)),
  setMonitorInfo: (monitorInfo: object) => dispatch(setMonitorInfo(monitorInfo)),
});

export default connect(
  mapState,
  mapDispatch,
)(App);
