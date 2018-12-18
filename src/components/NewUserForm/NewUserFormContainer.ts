import { connect } from 'react-redux';

import { createAdminUserRequest } from '../../redux/admin';
import NewUserForm from './NewUserForm';

const dispatchProps = {
  createUser: createAdminUserRequest,
};

export default connect(
  null,
  dispatchProps,
)(NewUserForm);
