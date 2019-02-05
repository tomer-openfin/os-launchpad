import { connect } from 'react-redux';

import { User } from '../../types/commons';

import { updateAdminUserRequest } from '../../redux/admin';
import { ROUTES } from '../Router/consts';

import withEscapeKey from '../../hocs/withEscapeKey';

import EditUserForm from './EditUserForm';

const mapDispatch = {
  updateUser: updateAdminUserRequest,
};

const mergeProps = (_, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  onEscDown: () => {
    ownProps.history.push(ROUTES.ADMIN_USERS);
  },
  pushRoute: (route: string, item?: User) => ownProps.history.push(route, item),
  user: ownProps.location.state,
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(withEscapeKey(EditUserForm));
