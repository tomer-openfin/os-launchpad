import { connect } from 'react-redux';

import { ADMIN_WINDOW } from '../../config/windows';
import { getIsAdmin } from '../../redux/me/selectors';
import { hideWindow } from '../../redux/windows';

import withEscapeKey from '../../hocs/withEscapeKey';
import Admin from './Admin';

const mapState = state => ({
  isAdmin: getIsAdmin(state),
});

const mapDispatch = dispatch => ({
  hideWindow: () => {
    dispatch(hideWindow(ADMIN_WINDOW));
  },
  onEscDown: () => {
    dispatch(hideWindow(ADMIN_WINDOW));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withEscapeKey(Admin));
