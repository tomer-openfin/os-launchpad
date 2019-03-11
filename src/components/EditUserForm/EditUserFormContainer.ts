import { connect } from 'react-redux';

import { getAdminUserFromId, updateAdminUserRequest } from '../../redux/admin';
import { State } from '../../redux/types';

import withEscapeKey from '../../hocs/withEscapeKey';
import EditUserForm from './EditUserForm';

const mapState = (state: State, ownProps) => ({
  user: getAdminUserFromId(state, ownProps.id),
});

const mapDispatch = {
  updateUser: updateAdminUserRequest,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onEscDown: ownProps.handleCancel,
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(withEscapeKey(EditUserForm));
