import * as React from 'react';

import { App, DispatchRequest } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';

import { CREATE_MANIFEST_FROM_APP_URL_BASE } from '../../services/ApiService/api';
import { createAppManifestUrl, ManifestType, Values } from '../AppForm';

import AppFormik from '../AppForm/AppFormik';
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

    const { appUrl, manifestType, manifestUrl, ...rest } = formData;

    const computedManifestUrl = createAppManifestUrl(appUrl, manifestUrl, manifestType);

    const editedApp = { ...rest, manifest_url: computedManifestUrl };

    return new Promise(resolve => {
      updateApp(editedApp, {
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

    const { id, manifest_url = '', name, title, description, icon } = app;

    const foundIndex = manifest_url.indexOf(CREATE_MANIFEST_FROM_APP_URL_BASE);

    // did manifest_url contain CREATE_MANIFEST_FROM_APP_URL_BASE?
    const isManifest = foundIndex === -1;

    // pass through the unmodified manifest if that was what was submitted,
    // otherwise, extract url from web url
    const submittedAppUrl = !isManifest ? manifest_url.slice(foundIndex + CREATE_MANIFEST_FROM_APP_URL_BASE.length) : '';

    const initialValues: Values = {
      // contexts: contexts || [],
      // images,
      // intents: intents || [],
      appUrl: submittedAppUrl,
      description,
      icon,
      id,
      manifestType: isManifest ? ManifestType.Manifest : ManifestType.AppUrl,
      manifestUrl: isManifest ? manifest_url : '',
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
