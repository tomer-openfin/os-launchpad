import { connect } from 'react-redux';

import { getAdminUsersList } from '../../redux/admin';
import { State } from '../../redux/types';

import AdminUsers from './AdminUsers';

// TODO: pull up into redux and mock consumption as it would be in API, then pull in here with selector
const stateProps = (state: State) => ({
  users: getAdminUsersList(state),
});

export default connect(stateProps)(AdminUsers);
