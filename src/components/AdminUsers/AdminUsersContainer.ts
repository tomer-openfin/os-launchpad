import { connect } from 'react-redux';

import { getAdminUsersList } from '../../redux/admin';
import { State } from '../../redux/types';

import AdminUsers from './AdminUsers';

const stateProps = (state: State) => ({
  users: getAdminUsersList(state),
});

export default connect(stateProps)(AdminUsers);
