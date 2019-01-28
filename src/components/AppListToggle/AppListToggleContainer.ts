import { connect } from 'react-redux';

import windowsConfig from '../../config/windows';
import { hideWindow, launchWindow } from '../../redux/windows';
import AppListToggle from './AppListToggle';

const mapDispatch = {
  hideWindow,
  launchWindow,
};

const mergeProps = (_, dispatchProps, ownProps) => ({
  ...ownProps,
  onClick: ownProps.isExpanded
    ? () => dispatchProps.hideWindow(windowsConfig.appLauncherOverflow.name)
    : () => dispatchProps.launchWindow(windowsConfig.appLauncherOverflow),
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(AppListToggle);
