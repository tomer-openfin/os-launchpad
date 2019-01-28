import { connect } from 'react-redux';

import { SETTINGS_WINDOW } from '../../config/windows';
import { getIsEnterprise } from '../../redux/application';
import { getAutoHide, getLauncherSize, setAutoHide, setLauncherPosition, setLauncherSize } from '../../redux/me';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';
import { DirectionalPosition, LauncherSize } from '../../types/commons';

import withEscapeKey from '../../hocs/withEscapeKey';
import Settings from './Settings';

const stateProps = (state: State) => ({
  autoHide: getAutoHide(state),
  isEnterprise: getIsEnterprise(state),
  launcherSize: getLauncherSize(state),
});

const dispatchProps = dispatch => ({
  hideWindow: () => {
    dispatch(hideWindow(SETTINGS_WINDOW));
  },
  onEscDown: () => {
    dispatch(hideWindow(SETTINGS_WINDOW));
  },
  setAutoHide: (autoHide: boolean) => {
    dispatch(setAutoHide(autoHide));
  },
  setLauncherPosition: (position: DirectionalPosition) => {
    dispatch(setLauncherPosition(position));
  },
  setLauncherSize: (launcherSize: LauncherSize) => {
    dispatch(setLauncherSize(launcherSize));
  },
});

export default connect(
  stateProps,
  dispatchProps,
)(withEscapeKey(Settings));
