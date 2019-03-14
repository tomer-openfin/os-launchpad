import * as React from 'react';

import { ROUTES } from '../Router/consts';

import { PushRoute } from '../../types/commons';

import { imageDisplayName, OrgImageKey } from '../../utils/orgImages';
import { createPushRouteHandler } from '../../utils/routeHelpers';

import AdminConfirmation, { confirmHandlerCreator } from '../AdminConfirmation';

interface Props {
  imageKey: OrgImageKey;
  pushRoute: PushRoute;
  revertImage: (payload: OrgImageKey) => void;
}

const ConfirmRevertImage = ({ imageKey, pushRoute, revertImage }: Props) => (
  <AdminConfirmation
    headingText={`Revert ${imageDisplayName(imageKey)} Asset`}
    confirmationText={`Are you sure you want to revert the ${imageDisplayName(imageKey)} asset back to the system default?`}
    parentRoute={ROUTES.ADMIN_SETTINGS}
    confirmCtaText="Revert"
    errorMessage={`There was an error trying to delete ${imageKey}`}
    onConfirm={confirmHandlerCreator(revertImage, imageKey)}
    onConfirmSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_SETTINGS)}
  />
);

export default ConfirmRevertImage;
