import { connect } from 'react-redux';

import windowsConfig from '../../config/windows';
import { hideWindow, launchWindow } from '../../redux/windows';
import AppListToggle from './AppListToggle';

interface MapDispatch {
  hideWindow: typeof hideWindow;
  launchWindow: typeof launchWindow;
}

const mapDispatch = {
  hideWindow,
  launchWindow,
};

const mergeProps = (_, dispatchProps: MapDispatch, ownProps) => ({
  ...ownProps,
  onClick: ownProps.isExpanded
    ? () => dispatchProps.hideWindow({ name: windowsConfig.appLauncherOverflow.name })
    : () => dispatchProps.launchWindow(windowsConfig.appLauncherOverflow),
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(AppListToggle);
