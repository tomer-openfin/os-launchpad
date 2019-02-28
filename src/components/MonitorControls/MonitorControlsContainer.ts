import { connect } from 'react-redux';

import { State } from '../../redux/types';

import { getMonitorScreens } from '../../redux/system';
import MonitorControls, { MonitorScreen } from './MonitorControls';

interface OwnProps {
  gutterSize: number;
  height: number;
  width: number;
}

interface MapState {
  monitorScreens: MonitorScreen[];
}

const mapState = (state: State, ownProps: OwnProps): MapState => ({
  monitorScreens: getMonitorScreens(state, ownProps),
});

export default connect<MapState, null, OwnProps, State>(mapState)(MonitorControls);
