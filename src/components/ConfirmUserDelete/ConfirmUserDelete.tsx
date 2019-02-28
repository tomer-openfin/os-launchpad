import * as React from 'react';

import { DispatchRequest, PushRoute, User } from '../../types/commons';

import { createPushRouteHandler } from '../../utils/routeHelpers';
import { ROUTES } from '../Router/consts';

import AdminConfirmation, { confirmHandlerCreator } from '../AdminConfirmation';

interface Props {
  deleteUser: DispatchRequest<User>;
  user: User;
  pushRoute: PushRoute;
}

const ConfirmUserDelete = ({ deleteUser, user, pushRoute }: Props) => (
  <AdminConfirmation
    headingText="Delete User"
    confirmationText={`Are you sure you want to delete the user:\n${user.firstName} ${user.lastName}?`}
    parentRoute={ROUTES.ADMIN_USERS}
    confirmCtaText="Delete"
    errorMessage={`Sorry, there was an error trying to delete ${user.firstName} ${user.lastName}`}
    onConfirm={confirmHandlerCreator(deleteUser, user)}
    onConfirmSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_USERS)}
  />
);

export default ConfirmUserDelete;
