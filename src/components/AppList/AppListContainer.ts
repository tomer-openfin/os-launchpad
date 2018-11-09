import { connect } from 'react-redux';

import { getAppsLauncherAppList, removeFromAppLauncher } from '../../redux/apps';

import { launchWindow, WindowConfig } from '../../redux/windows';

import AppList from './AppList';

const stateProps = state => ({
  appList: getAppsLauncherAppList(state),
  launcherPosition: state.me.settings.launcherPosition,
});

const dispatchProps = dispatch => ({
  launchWindowCreator: (window: WindowConfig) => () => dispatch(launchWindow(window)),
  removeFromLauncher: (appId: string) => dispatch(removeFromAppLauncher(appId)),
});

export default connect(
  stateProps,
  dispatchProps,
)(AppList);
