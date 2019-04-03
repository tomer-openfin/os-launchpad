import * as React from 'react';

import { App, DispatchRequest } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';

import { CREATE_MANIFEST_BASE } from '../../services/ApiService/api';
import { createAppManifestUrl } from '../AppForm';

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

  handleSubmitValues = (formData: App): Promise<void> => {
    const { handleSuccess, onResponseError, onResponseSuccess, updateApp } = this.props;

    const { appUrl, manifest_url, withAppUrl, ...rest } = formData;

    const computedManifestUrl = createAppManifestUrl({ appUrl, manifest_url, withAppUrl });

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

    const { appUrl, contexts, intents, id, manifest_url = '', name, title, description, icon, images } = app;

    const createManifestIndex = manifest_url.indexOf(CREATE_MANIFEST_BASE);
    const initialAppUrl = createManifestIndex !== -1 ? manifest_url.slice(createManifestIndex + CREATE_MANIFEST_BASE.length) : appUrl;

    const initialValues = {
      appUrl: initialAppUrl,
      // contexts: contexts || [],
      description,
      icon,
      id,
      // images,
      // intents: intents || [],
      manifest_url: createManifestIndex === -1 ? manifest_url : '',
      name,
      title,
      withAppUrl: !!initialAppUrl,
    };

    return (
      <FormWindow
        headingText={`Edit ${title}`}
        responseError={responseError}
        resetResponseError={resetResponseError}
        handleDeleteIconClick={handleDelete}
        message={`There was an error trying to update ${title}: ${responseMessage} Please try again.`}
      >
        <AppFormik handleSubmitValues={this.handleSubmitValues} handleCancel={handleCancel} initialValues={initialValues} />
      </FormWindow>
    );
  }
}

export default EditAppWindow;
