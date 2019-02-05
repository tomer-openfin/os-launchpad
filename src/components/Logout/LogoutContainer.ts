import { connect } from 'react-redux';

import { exitApplication } from '../../redux/application';
import { logoutRequest } from '../../redux/me';

import Logout from './Logout';

const mapDispatch = {
  exit: exitApplication,
  logout: logoutRequest,
};

export default connect(
  null,
  mapDispatch,
)(Logout);
