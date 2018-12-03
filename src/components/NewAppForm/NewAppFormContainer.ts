import { connect } from 'react-redux';

import { createAdminAppRequest } from '../../redux/admin';
import NewAppForm from './NewAppForm';

const dispatchProps = {
  createApp: createAdminAppRequest,
};

export default connect(
  null,
  dispatchProps,
)(NewAppForm);
