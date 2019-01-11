import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { APP_DIRECTORY_WINDOW } from '../../config/windows';
import { getAppsDirectoryAppList } from '../../redux/apps';
import { addToAppLauncher, getIsLauncherAppFromId, removeFromAppLauncher } from '../../redux/me';

import withEscapeKey from '../../hocs/withEscapeKey';
import withFinBlur from '../../hocs/withFinBlur';
import { App } from '../../types/commons';
import AppDirectory from './AppDirectory';

const stateProps = state => ({
  appList: getAppsDirectoryAppList(state),
  getIsLauncherApp: (appId: App['id']) => getIsLauncherAppFromId(state, appId),
});

const dispatchProps = dispatch => ({
  addToLauncher: (appId: App['id']) => dispatch(addToAppLauncher(appId)),
  hideWindow: () => {
    dispatch(Window.hideWindow({ id: APP_DIRECTORY_WINDOW }));
  },
  onBlur: () => {
    dispatch(Window.hideWindow({ id: APP_DIRECTORY_WINDOW }));
  },
  onEscDown: () => {
    dispatch(Window.hideWindow({ id: APP_DIRECTORY_WINDOW }));
  },
  removeFromLauncher: (appId: App['id']) => dispatch(removeFromAppLauncher(appId)),
});

export default connect(
  stateProps,
  dispatchProps,
)(withFinBlur(withEscapeKey(AppDirectory)));
