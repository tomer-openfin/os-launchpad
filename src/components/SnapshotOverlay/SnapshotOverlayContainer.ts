import { connect } from 'react-redux';

import { getChannelByMemberId } from '../../redux/channels';
import { getSnapshotSourceIdentity } from '../../redux/snapshot';
import { State } from '../../redux/types';
import { getUniqueWindowId } from '../../redux/windows/utils';
import { convertHexNumberToString } from '../../utils/convertHexNumberToString';

import SnapshotOverlay from './SnapshotOverlay.css';

const mapState = (state: State) => {
  const identity = getSnapshotSourceIdentity(state);
  const id = identity ? getUniqueWindowId(identity) : '';
  const channel = getChannelByMemberId(state, id);
  const backgroundColor = channel ? convertHexNumberToString(channel.color) : '#ffffff';

  return {
    backgroundColor,
  };
};

export default connect(mapState)(SnapshotOverlay);
