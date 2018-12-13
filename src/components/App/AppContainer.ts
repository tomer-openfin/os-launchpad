import { connect } from 'react-redux';
import { Action } from 'redux';

import { getDrawerIsExpanded, setIsDrawerExpanded } from '../../redux/application';
import { getLauncherPosition } from '../../redux/me';
import { getAppsLauncherAppList, getSystemIconsSelector } from '../../redux/selectors';
import { State } from '../../redux/types';
import withAutoHideApp from './withAutoHideApp';

import App from './App';

const mapState = (state: State) => ({
  apps: getAppsLauncherAppList(state),
  isDrawerExpanded: getDrawerIsExpanded(state),
  launcherPosition: getLauncherPosition(state),
  systemIcons: getSystemIconsSelector(state),
});

const mapDispatch = dispatch => ({
  dispatch: (action: Action) => dispatch(action),
  toggleDrawer: (isDrawerExpanded: boolean) => dispatch(setIsDrawerExpanded(isDrawerExpanded)),
});

const mergeProps = ({ apps, systemIcons, isDrawerExpanded, launcherPosition }, dispatchProps, ownProps) => ({
  ...ownProps,
  apps,
  icons: systemIcons.map(option => ({
    cta: () => dispatchProps.dispatch(option.action),
    default: option.default,
    hasExtendedWindow: option.hasExtendedWindow,
    icon: option.icon,
    key: option.key,
  })),
  isDrawerExpanded,
  launcherPosition,
  systemIcons,
  toggleDrawer: () => dispatchProps.toggleDrawer(!isDrawerExpanded),
});

export default withAutoHideApp(
  connect(
    mapState,
    mapDispatch,
    mergeProps,
  )(App),
);
