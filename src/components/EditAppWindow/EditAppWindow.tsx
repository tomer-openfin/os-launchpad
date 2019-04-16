import * as React from 'react';

import { App, DispatchRequest } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';

import AppFormik, { getEditAppValues, getSubmitAppData, ManifestType, Values } from '../AppForm';

import FormWindow from '../FormWindow';

interface Props extends ResponseProps {
  app: App;
  appId: App['id'];
  handleCancel: () => void;
  handleDelete: () => void;
  handleSuccess: () => void;
  onEscDown: () => void;
  updateApp: DispatchRequest<App>;
}

class EditAppWindow extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    // sCU lifecycle needed for 2 reasons:
    // 1. Prevents invalid ':id' from being passed in, which causes invalid re-render
    //    (this happens when url change triggers unmount until css transition completes and unmount occurs)
    // 2. Properly animate exit CSSTransitions, as a result of route switch
    return nextProps.appId === ':id' ? false : true;
  }

  handleSubmitValues = (formData: Values): Promise<void> => {
    const { handleSuccess, onResponseError, onResponseSuccess, updateApp } = this.props;

    return new Promise(resolve => {
      updateApp(getSubmitAppData(formData, false), {
        onFailure: onResponseError(resolve),
        onSuccess: onResponseSuccess(() => {
          handleSuccess();
          resolve();
        }),
      });
    });
  };

  render() {
    const { app, handleCancel, handleDelete, responseError, responseMessage, resetResponseError } = this.props;

    const { id, manifest_url = '', name, title, description, icon, manifestType } = app;

    const { appPath, appUrl, manifestUrl, manifestType: newManifestType } = getEditAppValues(manifest_url, manifestType as ManifestType);

    const initialValues: Values = {
      // contexts: contexts || [],
      // images,
      // intents: intents || [],
      appPath,
      appUrl,
      description,
      icon,
      id,
      manifestType: newManifestType,
      manifestUrl,
      name,
      title,
    };

    return (
      <FormWindow
        headingText={`Edit ${title}`}
        responseError={responseError}
        resetResponseError={resetResponseError}
        handleDeleteIconClick={handleDelete}
        message={`There was an error trying to update ${title}: ${responseMessage} Please try again.`}
      >
        <AppFormik handleSubmitValues={this.handleSubmitValues} handleCancel={handleCancel} initialValues={initialValues} focusFieldOnInitialMount={false} />
      </FormWindow>
    );
  }
}

export default EditAppWindow;
