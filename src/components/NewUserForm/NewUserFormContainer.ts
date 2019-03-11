import { connect } from 'react-redux';

import { createAdminUserRequest } from '../../redux/admin';

import withEscapeKey from '../../hocs/withEscapeKey';
import NewUserForm from './NewUserForm';

const mapDispatch = {
  createUser: createAdminUserRequest,
};

const mergeProps = (_, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  onEscDown: ownProps.handleCancel,
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(withEscapeKey(NewUserForm));
