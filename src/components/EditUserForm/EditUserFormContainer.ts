import { connect } from 'react-redux';

import { updateAdminUserRequest } from '../../redux/admin';
import EditUserForm from './EditUserForm';

const dispatchProps = {
  updateUser: updateAdminUserRequest,
};

export default connect(
  null,
  dispatchProps,
)(EditUserForm);
