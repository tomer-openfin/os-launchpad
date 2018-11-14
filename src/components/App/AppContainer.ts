import { connect } from 'react-redux';

import { collapseApp, expandApp, getApplicationIsExpanded } from '../../redux/application';
import { restoreLayout, saveLayoutRequest } from '../../redux/layouts';
import { getAutoHide } from '../../redux/me';
import { getSystemMonitorInfo, setMonitorInfo } from '../../redux/system';
import { State } from '../../redux/types';
import { getWindowBounds, launchWindow, WindowConfig } from '../../redux/windows';
import getAppUuid from '../../utils/getAppUuid';

import { Layout } from 'openfin-layouts/dist/client/types';

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
  launchWindow: (window: WindowConfig) => dispatch(launchWindow(window)),
  restoreCurrentLayout: () => dispatch(restoreLayout(JSON.parse(localStorage.layouts)[0] as Layout)),
  // force the generation of current layout on save by passing in undefined
  saveCurrentLayout: () => dispatch(saveLayoutRequest((undefined as unknown) as Layout)),
  setMonitorInfo: (monitorInfo: object) => dispatch(setMonitorInfo(monitorInfo)),
});

export default connect(
  mapState,
  mapDispatch,
)(App);
