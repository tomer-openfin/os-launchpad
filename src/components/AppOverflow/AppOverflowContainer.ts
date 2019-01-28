import { connect } from 'react-redux';

import { APP_LAUNCHER_OVERFLOW_WINDOW } from '../../config/windows';
import withFinBlur from '../../hocs/withFinBlur';
import { getIsDragAndDrop } from '../../redux/application';
import { blurWindowWithDelay } from '../../redux/windows';

import AppOverflow from './AppOverflow';

const mapState = state => ({
  preventBlur: getIsDragAndDrop(state),
});

const dispatchProps = dispatch => ({
  onBlur: () => dispatch(blurWindowWithDelay(APP_LAUNCHER_OVERFLOW_WINDOW, 0)),
});

export default connect(
  mapState,
  dispatchProps,
)(withFinBlur(AppOverflow));
