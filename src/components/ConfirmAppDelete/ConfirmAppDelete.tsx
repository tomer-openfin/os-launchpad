import * as React from 'react';

import { App, DispatchRequest, PushRoute } from '../../types/commons';

import { createPushRouteHandler } from '../../utils/routeHelpers';
import { ROUTES } from '../Router/consts';

import AdminConfirmation, { confirmHandlerCreator } from '../AdminConfirmation';

interface Props {
  app: App;
  deleteApp: DispatchRequest<App>;
  pushRoute: PushRoute;
}

const ConfirmAppDelete = ({ app, deleteApp, pushRoute }: Props) => (
  <AdminConfirmation
    headingText="Delete App"
    confirmationText={`Are you sure you want to delete the app:\n${app.title}?`}
    parentRoute={ROUTES.ADMIN_APPS}
    confirmCtaText="Delete"
    errorMessage={`There was an error trying to delete ${app.title}`}
    onConfirm={confirmHandlerCreator(deleteApp, app)}
    onConfirmSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_APPS)}
  />
);

export default ConfirmAppDelete;
