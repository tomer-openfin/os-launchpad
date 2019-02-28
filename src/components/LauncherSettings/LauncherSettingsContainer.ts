import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getAutoHide, getLauncherPosition, getLauncherSize, setAutoHide, setLauncherPosition, setLauncherSize } from '../../redux/me';
import { getMonitorDetailsIds } from '../../redux/system';
import { State } from '../../redux/types';
import { DirectionalPosition, LauncherSize } from '../../types/commons';

import LauncherSettings from './LauncherSettings';

const mapState = (state: State) => ({
  autoHide: getAutoHide(state),
  isChangeLauncherMonitorDisabled: getMonitorDetailsIds(state).length < 2,
  launcherPosition: getLauncherPosition(state),
  launcherSize: getLauncherSize(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
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
  mapState,
  mapDispatch,
)(LauncherSettings);
