import { connect } from 'react-redux';

import { deleteAdminUserRequest, getAdminUserFromId } from '../../redux/admin';
import { State } from '../../redux/types';
import ConfirmUserDelete from './ConfirmUserDelete';

const mapState = (state: State, ownProps) => ({
  user: getAdminUserFromId(state, ownProps.id),
});

const mapDispatch = {
  deleteUser: deleteAdminUserRequest,
};

export default connect(
  mapState,
  mapDispatch,
)(ConfirmUserDelete);
