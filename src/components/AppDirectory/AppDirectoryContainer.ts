import { connect } from 'react-redux';

import { addToAppLauncher, getAppsDirectoryAppList, getAppsLauncherIds, removeFromAppLauncher } from '../../redux/apps';

import AppDirectory from './AppDirectory';

const stateProps = state => ({
  appList: getAppsDirectoryAppList(state),
  launcherAppIds: getAppsLauncherIds(state),
});

const dispatchProps = dispatch => ({
  addToLauncher: (id: string) => dispatch(addToAppLauncher(id)),
  removeFromLauncher: (id: string) => dispatch(removeFromAppLauncher(id)),
});

export default connect(
  stateProps,
  dispatchProps,
)(AppDirectory);
