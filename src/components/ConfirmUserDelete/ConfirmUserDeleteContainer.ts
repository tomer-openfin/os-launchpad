import { connect } from 'react-redux';

import { deleteAdminUser, getAdminUserFromId } from '../../redux/admin';
import { State } from '../../redux/types';

import ConfirmUserDelete from './ConfirmUserDelete';

const mapState = (state: State, ownProps) => ({
  user: getAdminUserFromId(state, ownProps.userId),
});

const mapDispatch = {
  deleteUser: deleteAdminUser.request,
};

export default connect(
  mapState,
  mapDispatch,
)(ConfirmUserDelete);
