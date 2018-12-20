import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateAdminUserRequest } from '../../redux/admin';
import EditUserForm from './EditUserForm';

const dispatchProps = {
  updateUser: updateAdminUserRequest,
};

export default withRouter(
  connect(
    null,
    dispatchProps,
  )(EditUserForm),
);
