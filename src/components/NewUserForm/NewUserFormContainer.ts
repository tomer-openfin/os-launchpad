import { connect } from 'react-redux';

import { User } from '../../types/commons';

import { createAdminUserRequest } from '../../redux/admin';
import { ROUTES } from '../Router/consts';

import withEscapeKey from '../../hocs/withEscapeKey';

import NewUserForm from './NewUserForm';

const mapDispatch = {
  createUser: createAdminUserRequest,
};

const mergeProps = (_, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  onEscDown: () => {
    ownProps.history.push(ROUTES.ADMIN_USERS);
  },
  pushRoute: (route: string, item?: User): void => ownProps.history.push(route, item),
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(withEscapeKey(NewUserForm));
