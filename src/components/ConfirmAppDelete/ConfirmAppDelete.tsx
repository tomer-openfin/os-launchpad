import * as React from 'react';

import { App, DispatchRequest } from '../../types/commons';

import AdminConfirmation, { confirmHandlerCreator } from '../AdminConfirmation';

interface Props {
  app: App;
  deleteApp: DispatchRequest<App>;
  handleCancel: () => void;
  handleSuccess: () => void;
  id: App['id'];
}

const ConfirmAppDelete = ({ app, deleteApp, handleCancel, handleSuccess }: Props) => {
  if (!app) return null;

  return (
    <AdminConfirmation
      handleCancel={handleCancel}
      headingText="Delete App"
      confirmationText={`Are you sure you want to delete the app:\n${app.title}?`}
      confirmCtaText="Delete"
      errorMessage={`There was an error trying to delete ${app.title}`}
      onConfirm={confirmHandlerCreator(deleteApp, app)}
      onConfirmSuccess={handleSuccess}
    />
  );
};

export default ConfirmAppDelete;
