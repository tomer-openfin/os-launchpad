import { connect } from 'react-redux';

import { getAdminAppsList } from '../../redux/admin/index';
import AdminApps from './AdminApps';

// TODO: pull up into redux and mock consumption as it would be in API, then pull in here with selector
const stateProps = state => ({
  apps: getAdminAppsList(state),
});

export default connect(stateProps)(AdminApps);
