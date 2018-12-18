import { connect } from 'react-redux';

import { APP_LAUNCHER_OVERFLOW_WINDOW } from '../../config/windows';
import withFinBlur from '../../hocs/withFinBlur';
import { blurWindowWithDelay } from '../../redux/windows';
import AppOverflow from './AppOverflow';

const dispatchProps = dispatch => ({
  onBlur: () => dispatch(blurWindowWithDelay(APP_LAUNCHER_OVERFLOW_WINDOW)),
});

export default connect(
  null,
  dispatchProps,
)(withFinBlur(AppOverflow));
