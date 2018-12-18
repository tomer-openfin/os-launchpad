import { connect } from 'react-redux';

import { deleteAdminUserRequest } from '../../redux/admin';
import ConfirmUserDelete from './ConfirmUserDelete';

const dispatchProps = {
  deleteUser: deleteAdminUserRequest,
};

export default connect(
  null,
  dispatchProps,
)(ConfirmUserDelete);
