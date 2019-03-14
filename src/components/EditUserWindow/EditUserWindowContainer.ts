import { connect } from 'react-redux';

import { getAdminUserFromId, updateAdminUserRequest } from '../../redux/admin';
import { State } from '../../redux/types';
import { MetaWithCallbacks, User } from '../../types/commons';

import withEscapeKey from '../../hocs/withEscapeKey';
import withResponseState from '../../hocs/withResponseState';
import EditUserWindow from './EditUserWindow';

const mapState = (state: State, ownProps) => ({
  user: getAdminUserFromId(state, ownProps.userId),
});

const mapDispatch = (dispatch, ownProps) => ({
  ...ownProps,
  updateUser: (user: User, meta: MetaWithCallbacks) => dispatch(updateAdminUserRequest(user, meta)),
});

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
)(withEscapeKey(withResponseState(EditUserWindow)));
