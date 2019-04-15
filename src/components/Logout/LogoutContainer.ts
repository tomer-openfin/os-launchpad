import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { exitApplication } from '../../redux/application';
import { logout } from '../../redux/me';
import { EventType, sendAnalytics } from '../../utils/analytics';

import Logout from './Logout';

const mapDispatch = (dispatch: Dispatch) => ({
  exit: () => {
    sendAnalytics({ type: EventType.Click, label: 'CloseApplication' });
    // Ensure sendAnalytics get sent before application closes
    setTimeout(() => {
      dispatch(exitApplication());
    }, 0);
  },
  logout: () => {
    sendAnalytics({ type: EventType.Click, label: 'LogOut' });
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
