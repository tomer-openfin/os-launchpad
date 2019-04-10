import * as React from 'react';

import { App, DispatchRequest } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';

import AppFormik, { getSubmitAppData, ManifestType, Values } from '../AppForm';
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
  appUrl: '',
  description: '',
  icon: '',
  id: '',
  manifestType: ManifestType.AppUrl, // default RadioOption
  manifestUrl: '',
  name: '',
  title: '',
};

class NewAppWindow extends React.Component<Props> {
  handleSubmitValues = (formData: Values): Promise<void> => {
    const { createApp, handleSuccess, onResponseError, onResponseSuccess } = this.props;

    return new Promise(resolve => {
      createApp(getSubmitAppData(formData, true), {
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
        <AppFormik handleSubmitValues={this.handleSubmitValues} handleCancel={handleCancel} initialValues={emptyApp} focusFieldOnInitialMount={true} />
      </FormWindow>
    );
  }
}

export default NewAppWindow;
