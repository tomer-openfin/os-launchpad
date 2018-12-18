import { connect } from 'react-redux';

import windowsConfig from '../../config/windows';
import { getDrawerIsExpanded } from '../../redux/application/index';
import { State } from '../../redux/types';
import { blurWindowWithDelay, launchWindow } from '../../redux/windows';
import AppListToggle from './AppListToggle';

const mapState = (state: State) => ({
  isDisabled: getDrawerIsExpanded(state),
});

const mapDispatch = {
  blurWindowWithDelay,
  launchWindow,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  onClick: ownProps.isExpanded
    ? () => dispatchProps.blurWindowWithDelay(windowsConfig.appLauncherOverflow.name)
    : () => dispatchProps.launchWindow(windowsConfig.appLauncherOverflow),
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(AppListToggle);
