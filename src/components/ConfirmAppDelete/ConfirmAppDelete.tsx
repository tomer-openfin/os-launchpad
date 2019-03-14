import * as React from 'react';

import { App, DispatchRequest } from '../../types/commons';

import AdminConfirmation, { confirmHandlerCreator } from '../AdminConfirmation';

interface Props {
  app: App;
  deleteApp: DispatchRequest<App>;
  handleCancel: () => void;
  handleSuccess: () => void;
}

class ConfirmAppDelete extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.app && !nextProps.app ? false : true;
  }

  render() {
    const { app, deleteApp, handleCancel, handleSuccess } = this.props;

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
  }
}

export default ConfirmAppDelete;
