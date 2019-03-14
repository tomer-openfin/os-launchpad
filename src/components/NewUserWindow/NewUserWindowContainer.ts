import { connect } from 'react-redux';

import { MetaWithCallbacks, User } from '../../types/commons';

import { createAdminUserRequest } from '../../redux/admin';

import withEscapeKey from '../../hocs/withEscapeKey';
import withResponseState from '../../hocs/withResponseState';

import NewUserWindow from './NewUserWindow';

const mapDispatch = (dispatch, ownProps) => ({
  ...ownProps,
  createUser: (user: User, meta: MetaWithCallbacks) => dispatch(createAdminUserRequest(user, meta)),
  onEscDown: ownProps.handleCancel,
});

export default connect(
  null,
  mapDispatch,
)(withEscapeKey(withResponseState(NewUserWindow)));
