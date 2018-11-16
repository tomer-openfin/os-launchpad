import { connect } from 'react-redux';

import AppData from '../../const/AppData';

import AdminApps from './AdminApps';

// TODO: pull up into redux and mock consumption as it would be in API, then pull in here with selector
const stateProps = state => ({
  apps: AppData,
});

export default connect(stateProps)(AdminApps);
