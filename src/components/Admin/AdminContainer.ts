import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { ADMIN_WINDOW } from '../../config/windows';
import { getIsAdmin } from '../../redux/me/selectors';

import withEscapeKey from '../../hocs/withEscapeKey';
import Admin from './Admin';

const mapState = state => ({
  isAdmin: getIsAdmin(state),
});

const mapDispatch = dispatch => ({
  onEscDown: () => {
    dispatch(Window.hideWindow({ id: ADMIN_WINDOW }));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withEscapeKey(Admin));
