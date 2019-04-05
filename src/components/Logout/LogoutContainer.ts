import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { exitApplication } from '../../redux/application';
import { logout } from '../../redux/me';

import Logout from './Logout';

const mapDispatch = (dispatch: Dispatch) => ({
  exit: () => dispatch(exitApplication()),
  logout: () => {
    // Bypass redux for immediate result
    const { fin } = window;
    if (fin) {
      fin.desktop.Window.getCurrent().hide();
    }
    dispatch(logout.request({ message: 'You have been successfully logged out.', isError: false }));
  },
});

export default connect(
  null,
  mapDispatch,
)(Logout);
