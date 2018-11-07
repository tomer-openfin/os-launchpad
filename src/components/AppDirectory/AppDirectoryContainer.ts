import { connect } from 'react-redux';

import { addToAppLauncher, removeFromAppLauncher } from '../../redux/apps';
import { getAppDirectoryList, getLauncherAppIds } from '../../redux/apps/reducer';
import AppDirectory from './AppDirectory';

const stateProps = state => ({
  appList: getAppDirectoryList(state),
  launcherAppIds: getLauncherAppIds(state),
});

const dispatchProps = dispatch => ({
  addToLauncher: (id: string) => dispatch(addToAppLauncher(id)),
  removeFromLauncher: (id: string) => dispatch(removeFromAppLauncher(id)),
});

export default connect(
  stateProps,
  dispatchProps,
)(AppDirectory);
