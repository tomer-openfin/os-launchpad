import { connect } from 'react-redux';

import { APP_DIRECTORY_WINDOW } from '../../config/windows';
import { getAppsDirectoryAppList } from '../../redux/apps';
import { addToAppLauncher, getIsLauncherAppFromId, removeFromAppLauncher } from '../../redux/me';
import { hideWindow } from '../../redux/windows';

import withEscapeKey from '../../hocs/withEscapeKey';
import { App } from '../../types/commons';
import AppDirectory from './AppDirectory';

const stateProps = state => ({
  appList: getAppsDirectoryAppList(state),
  getIsLauncherApp: (appId: App['id']) => getIsLauncherAppFromId(state, appId),
});

const dispatchProps = dispatch => ({
  addToLauncher: (appId: App['id']) => dispatch(addToAppLauncher(appId)),
  hideWindow: () => {
    dispatch(hideWindow({ name: APP_DIRECTORY_WINDOW }));
  },
  onEscDown: () => {
    dispatch(hideWindow({ name: APP_DIRECTORY_WINDOW }));
  },
  removeFromLauncher: (appId: App['id']) => dispatch(removeFromAppLauncher(appId)),
});

export default connect(
  stateProps,
  dispatchProps,
)(withEscapeKey(AppDirectory));
