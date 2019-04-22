import { connect } from 'react-redux';
import { Action } from 'redux';

import { getDrawerIsExpanded, setIsDrawerExpanded } from '../../redux/application';
import { getLauncherPosition, getLauncherSizeConfig, getSystemTrayEnabled } from '../../redux/me';
import { getCollapsedSystemDrawerSize } from '../../redux/selectors';
import { State } from '../../redux/types';

import App from './App';

const mapState = (state: State) => ({
  collapsedSystemDrawerSize: getCollapsedSystemDrawerSize(state),
  hasSystemTrayEnabled: getSystemTrayEnabled(state),
  isDrawerExpanded: getDrawerIsExpanded(state),
  launcherPosition: getLauncherPosition(state),
  launcherSizeConfig: getLauncherSizeConfig(state),
});

const mapDispatch = dispatch => ({
  dispatch: (action: Action) => dispatch(action),
  toggleDrawer: (isDrawerExpanded: boolean) => dispatch(setIsDrawerExpanded(isDrawerExpanded)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  toggleDrawer: () => dispatchProps.toggleDrawer(!stateProps.isDrawerExpanded),
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(App);
