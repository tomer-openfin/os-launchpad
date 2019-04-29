import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { exitApplication, getIsEnterprise } from '../../redux/application';
import { logout } from '../../redux/me';
import { State } from '../../redux/types';
import { EventType, sendAnalytics } from '../../utils/analytics';

import { hideWindow } from '../../utils/finUtils';
import Logout from './Logout';

const mapState = (state: State) => ({
  isEnterprise: getIsEnterprise(state),
});

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
    // tslint:disable-next-line:no-console
    hideWindow()().catch(e => console.warn('Caught error in hiding logout window:', e));
    dispatch(logout.request({ message: 'You have been successfully logged out.', isError: false }));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Logout);
