import { connect } from 'react-redux';

import { deleteAdminAppRequest } from '../../redux/admin';
import ConfirmAppDelete from './ConfirmAppDelete';

const dispatchProps = {
  deleteApp: deleteAdminAppRequest,
};

export default connect(
  null,
  dispatchProps,
)(ConfirmAppDelete);
