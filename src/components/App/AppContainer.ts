import { connect } from 'react-redux';
import { Action } from 'redux';

import { getIsAdmin, getLauncherPosition } from '../../redux/me';
import { getAppsLauncherAppList } from '../../redux/selectors';
import { State } from '../../redux/types';
import { getLauncherIcons } from '../../utils/getLauncherIcons';
import withAutoHideApp from './withAutoHideApp';

import App from './App';

const mapState = (state: State) => ({
  apps: getAppsLauncherAppList(state),
  isAdmin: getIsAdmin(state),
  launcherPosition: getLauncherPosition(state),
});

const mapDispatch = dispatch => ({
  dispatch: (action: Action) => dispatch(action),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  apps: stateProps.apps,
  icons: getLauncherIcons(stateProps.isAdmin).map(option => ({
    cta: () => dispatchProps.dispatch(option.action),
    icon: option.icon,
    key: option.key,
  })),
  launcherPosition: stateProps.launcherPosition,
});

export default withAutoHideApp(
  connect(
    mapState,
    mapDispatch,
    mergeProps,
  )(App),
);
