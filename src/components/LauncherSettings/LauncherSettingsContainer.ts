import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getLauncherPosition, getLauncherSize, getSystemTrayEnabled, setLauncherPosition, setLauncherSize, setSystemTrayEnabled } from '../../redux/me';
import { getMonitorDetailsIds } from '../../redux/system';
import { State } from '../../redux/types';
import { DirectionalPosition, LauncherSize } from '../../types/commons';

import { EventType, sendAnalytics } from '../../utils/analytics';
import LauncherSettings from './LauncherSettings';

const mapState = (state: State) => ({
  isChangeLauncherMonitorDisabled: getMonitorDetailsIds(state).length < 2,
  launcherPosition: getLauncherPosition(state),
  launcherSize: getLauncherSize(state),
  systemTrayEnabled: getSystemTrayEnabled(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  setLauncherPosition: (position: DirectionalPosition) => {
    sendAnalytics({ type: EventType.Click, label: 'LauncherPosition', context: { value: position } });
    dispatch(setLauncherPosition({ launcherPosition: position }));
  },
  setLauncherSize: (launcherSize: LauncherSize) => {
    sendAnalytics({ type: EventType.Click, label: 'LauncherSize', context: { value: launcherSize } });
    dispatch(setLauncherSize({ launcherSize }));
  },
  setSystemTrayEnabled: (systemTrayEnabled: boolean) => {
    sendAnalytics({ type: EventType.Click, label: 'SystemTrayEnabled', context: { value: systemTrayEnabled } });
    dispatch(setSystemTrayEnabled({ systemTrayEnabled }));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(LauncherSettings);
