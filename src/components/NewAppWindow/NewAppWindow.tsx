import * as React from 'react';

import { App, DispatchRequest } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';

import AppFormik, { createAppManifestUrl, Values } from '../AppForm';
import FormWindow from '../FormWindow';

interface Props extends ResponseProps {
  createApp: DispatchRequest<App>;
  onEscDown: () => void;
  handleCancel: () => void;
  handleSuccess: () => void;
}

const emptyApp: Values = {
  // contexts: [],
  // images: [],
  // intents: [],
  description: '',
  icon: '',
  id: '',
  manifestType: 'appUrl',
  name: '',
  title: '',
  url: '',
};

class NewAppWindow extends React.Component<Props> {
  handleSubmitValues = (formData: Values): Promise<void> => {
    const { createApp, handleSuccess, onResponseError, onResponseSuccess } = this.props;

    // modify App Title to create the App Name (removed input field for this) and needed for formData
    // todo: ensure uniqueness -> sync up with OF Brian, how is this being handled on BE?
    formData.name = formData.title.replace(/\s/g, '');

    const { manifestType, url, ...rest } = formData;

    const computedManifestUrl = createAppManifestUrl(url, manifestType);

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
        <AppFormik handleSubmitValues={this.handleSubmitValues} handleCancel={handleCancel} initialValues={emptyApp} />
      </FormWindow>
    );
  }
}

export default NewAppWindow;
