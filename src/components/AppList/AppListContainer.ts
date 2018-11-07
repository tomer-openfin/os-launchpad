import { connect } from 'react-redux';

import { getAppLauncherList } from '../../redux/apps/reducer';
import { launchWindow, WindowConfig } from '../../redux/windows';

import AppList from './AppList';

const stateProps = state => ({
  appList: getAppLauncherList(state),
});

const dispatchProps = dispatch => ({
  launchWindowCreator: (window: WindowConfig) => () => dispatch(launchWindow(window)),
});

export default connect(
  stateProps,
  dispatchProps,
)(AppList);
