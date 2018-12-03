import { connect } from 'react-redux';

import { getAdminAppsList } from '../../redux/admin';

import AdminApps from './AdminApps';

const stateProps = state => ({
  apps: getAdminAppsList(state),
});

export default connect(stateProps)(AdminApps);
