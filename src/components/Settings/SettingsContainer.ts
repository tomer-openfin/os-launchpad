import { connect } from 'react-redux';

import {
  getAutoHide,
  setAutoHide,
  setLaunchbarPosition,
} from '../../redux/me';
import Settings from './Settings';

const stateProps = state => ({
  autoHide: getAutoHide(state),
});

const dispatchProps = {
  setAutoHide,
  setLaunchbarPosition,
};

export default connect(
  stateProps,
  dispatchProps,
)(Settings);
