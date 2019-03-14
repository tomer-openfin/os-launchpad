import * as React from 'react';

import { App, DispatchRequest } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';

import { createAppManifestUrl, Values } from '../AppForm';
import FormWindow from '../FormWindow';
import NewAppFormik from '../NewAppForm/NewAppForm';

interface Props extends ResponseProps {
  createApp: DispatchRequest<App>;
  onEscDown: () => void;
  handleCancel: () => void;
  handleSuccess: () => void;
}

const emptyApp = {
  appUrl: '',
  contexts: [],
  description: '',
  icon: '',
  id: '',
  images: [],
  intents: [],
  manifest_url: '',
  name: '',
  title: '',
  withAppUrl: true,
};

class NewAppWindow extends React.Component<Props> {
  handleSubmitValues = (formData: Values): Promise<void> => {
    const { createApp, handleSuccess, onResponseError, onResponseSuccess } = this.props;

    // modify App Title to create the App Name (removed input field for this) and needed for formData
    // todo: ensure uniqueness -> sync up with OF Brian, how is this being handled on BE?
    formData.name = formData.title.replace(/\s/g, '');

    const { appUrl, manifest_url, withAppUrl, ...rest } = formData;

    const computedManifestUrl = createAppManifestUrl({ appUrl, manifest_url, withAppUrl });

    const newApp = { ...rest, manifest_url: computedManifestUrl };

    return new Promise(resolve => {
      createApp(newApp, {
        onFailure: onResponseError(resolve),
        onSuccess: onResponseSuccess(() => {
          handleSuccess();
          resolve();
        }),
      });
    });
  };

  render() {
    const { handleCancel, responseError, responseMessage, resetResponseError } = this.props;

    return (
      <FormWindow
        headingText="Create New App"
        responseError={responseError}
        resetResponseError={resetResponseError}
        message={`There was an error trying to create this app: ${responseMessage} Please try again.`}
      >
        <NewAppFormik handleSubmitValues={this.handleSubmitValues} handleCancel={handleCancel} initialValues={emptyApp} />
      </FormWindow>
    );
  }
}

export default NewAppWindow;
