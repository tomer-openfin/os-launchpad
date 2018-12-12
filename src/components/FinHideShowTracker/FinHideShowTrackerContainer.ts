import { connect } from 'react-redux';

import { windowHidden, windowShown } from '../../redux/windows';
import FinHideShowTracker from './FinHideShowTracker';

const mapDispatch = {
  windowHidden,
  windowShown,
};

export default connect(
  null,
  mapDispatch,
)(FinHideShowTracker);
