import { connect } from 'react-redux';

import windowsConfig from '../../config/windows';
import { blurWindowWithDelay, DEFAULT_BLUR_WINDOW_DELAY, launchWindow } from '../../redux/windows';
import AppListToggle from './AppListToggle';

const mapDispatch = {
  blurWindowWithDelay,
  launchWindow,
};

const mergeProps = (_, dispatchProps, ownProps) => ({
  ...ownProps,
  onClick: ownProps.isExpanded
    ? () => dispatchProps.blurWindowWithDelay(windowsConfig.appLauncherOverflow.name, DEFAULT_BLUR_WINDOW_DELAY)
    : () => dispatchProps.launchWindow(windowsConfig.appLauncherOverflow),
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(AppListToggle);
