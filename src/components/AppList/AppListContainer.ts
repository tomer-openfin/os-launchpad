import { connect } from 'react-redux';

import { getAppsStatusByName, openFinAppRequest } from '../../redux/apps/index';
import { getAppsLauncherAppList, removeFromAppLauncher } from '../../redux/me';
import { launchWindow, WindowConfig } from '../../redux/windows';

import { App } from '../../types/commons';
import AppList from './AppList';

const stateProps = state => ({
  appList: getAppsLauncherAppList(state),
  appsStatusByName: getAppsStatusByName(state),
  launcherPosition: state.me.settings.launcherPosition,
});

const dispatchProps = dispatch => ({
  launchApp: (app: App) => dispatch(openFinAppRequest(app)),
  launchWindowCreator: (window: WindowConfig) => () => dispatch(launchWindow(window)),
  removeFromLauncher: (appId: string) => dispatch(removeFromAppLauncher(appId)),
});

export default connect(
  stateProps,
  dispatchProps,
)(AppList);
