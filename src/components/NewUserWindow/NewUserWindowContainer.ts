import { connect } from 'react-redux';

import { MetaWithAsyncHandlers, User } from '../../types/commons';

import { createAdminUser } from '../../redux/admin';

import withEscapeKey from '../../hocs/withEscapeKey';
import withResponseState from '../../hocs/withResponseState';

import NewUserWindow from './NewUserWindow';

const mapDispatch = (dispatch, ownProps) => ({
  ...ownProps,
  createUser: (user: User, meta: MetaWithAsyncHandlers<User>) => dispatch(createAdminUser.request(user, meta)),
  onEscDown: ownProps.handleCancel,
});

export default connect(
  null,
  mapDispatch,
)(withEscapeKey(withResponseState(NewUserWindow)));
