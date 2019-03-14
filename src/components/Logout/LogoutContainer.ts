import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { exitApplication } from '../../redux/application';
import { logout } from '../../redux/me';

import Logout from './Logout';

const mapDispatch = (dispatch: Dispatch) => ({
  exit: () => dispatch(exitApplication()),
  logout: () => dispatch(logout.request()),
});

export default connect(
  null,
  mapDispatch,
)(Logout);
