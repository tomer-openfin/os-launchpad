import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { User } from '../../types/commons';

import { deleteAdminUserRequest } from '../../redux/admin';

import ConfirmUserDelete from './ConfirmUserDelete';

const mapDispatch = {
  deleteUser: deleteAdminUserRequest,
};

const mergeProps = (_, dispatchProps, ownProps: RouteComponentProps) => ({
  ...dispatchProps,
  ...ownProps,
  pushRoute: (route: string, item?: User): void => ownProps.history.push(route, item),
  user: ownProps.location.state,
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(ConfirmUserDelete);
