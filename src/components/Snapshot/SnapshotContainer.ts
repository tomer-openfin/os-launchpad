import { connect } from 'react-redux';

import { getSnapshotImgSrc } from '../../redux/snapshot';
import { State } from '../../redux/types';

import Snapshot from './Snapshot.css';

const mapState = (state: State) => ({
  imgSrc: getSnapshotImgSrc(state),
});

export default connect(mapState)(Snapshot);
