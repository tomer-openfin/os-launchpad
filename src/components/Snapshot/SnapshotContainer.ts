import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { clearSnapshot, getSnapshotImgSrc } from '../../redux/snapshot';
import { State } from '../../redux/types';

import Snapshot from './Snapshot.css';

const mapState = (state: State) => ({
  imgSrc: getSnapshotImgSrc(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  onClick: () => dispatch(clearSnapshot()),
});

export default connect(
  mapState,
  mapDispatch,
)(Snapshot);
