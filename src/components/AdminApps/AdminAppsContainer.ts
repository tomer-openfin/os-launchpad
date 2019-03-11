import { connect } from 'react-redux';

import { getAdminAppsList } from '../../redux/admin';
import { State } from '../../redux/types';

import AdminApps from './AdminApps';

const stateProps = (state: State) => ({
  apps: getAdminAppsList(state),
});

export default connect(stateProps)(AdminApps);
