import { connect } from 'react-redux';

import { getLauncherPosition } from '../../redux/me';
import { State } from '../../redux/types';
import { DirectionalPosition } from '../../types/enums';

import AppOverflow from './AppOverflow';

interface MapState {
  launcherPosition: DirectionalPosition;
}

const mapState = (state: State) => ({
  launcherPosition: getLauncherPosition(state),
});

export default connect<MapState, null, null, State>(mapState)(AppOverflow);
