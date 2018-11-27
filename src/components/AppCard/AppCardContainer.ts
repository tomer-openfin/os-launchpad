import { connect } from 'react-redux';

import { addToAppLauncher, getIsLauncherAppFromId, removeFromAppLauncher } from '../../redux/me';

import AppCard from './AppCard';

const stateProps = (state, props) => ({
  isLauncherApp: getIsLauncherAppFromId(state, props.app.id),
});

const dispatchProps = dispatch => ({
  addToLauncher: (appId: string) => dispatch(addToAppLauncher(appId)),
  removeFromLauncher: (appId: string) => dispatch(removeFromAppLauncher(appId)),
});

export default connect(
  stateProps,
  dispatchProps,
)(AppCard);
