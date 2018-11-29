import { connect } from 'react-redux';

import { openFinAppRequest } from '../../redux/apps';
import { addToAppLauncher, getIsLauncherAppFromId, removeFromAppLauncher } from '../../redux/me';
import { App } from '../../types/commons';

import AppCard from './AppCard';

const stateProps = (state, props) => ({
  isLauncherApp: getIsLauncherAppFromId(state, props.app.id),
});

const dispatchProps = dispatch => ({
  addToLauncher: (appId: string) => dispatch(addToAppLauncher(appId)),
  launchApp: (app: App) => dispatch(openFinAppRequest(app)),
  removeFromLauncher: (appId: string) => dispatch(removeFromAppLauncher(appId)),
});

export default connect(
  stateProps,
  dispatchProps,
)(AppCard);
