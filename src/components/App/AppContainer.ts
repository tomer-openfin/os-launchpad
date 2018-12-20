import { connect } from 'react-redux';
import { Action } from 'redux';

import { getDrawerIsExpanded, setIsDrawerExpanded } from '../../redux/application';
import { getLauncherPosition } from '../../redux/me';
import { getSystemIconsSelector } from '../../redux/selectors';
import { State } from '../../redux/types';
import withAutoHideApp from './withAutoHideApp';

import App from './App';

const mapState = (state: State) => ({
  isDrawerExpanded: getDrawerIsExpanded(state),
  launcherPosition: getLauncherPosition(state),
  systemIcons: getSystemIconsSelector(state),
});

const mapDispatch = dispatch => ({
  dispatch: (action: Action) => dispatch(action),
  toggleDrawer: (isDrawerExpanded: boolean) => dispatch(setIsDrawerExpanded(isDrawerExpanded)),
});

const mergeProps = ({ systemIcons, isDrawerExpanded, launcherPosition }, dispatchProps, ownProps) => ({
  ...ownProps,
  icons: systemIcons.map(option => ({
    cta: () => dispatchProps.dispatch(option.action),
    hasExtendedWindow: option.hasExtendedWindow,
    icon: option.icon,
    key: option.key,
    shownCollapsed: option.shownCollapsed,
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
