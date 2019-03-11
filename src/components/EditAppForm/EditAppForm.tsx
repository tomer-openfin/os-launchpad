import { FormikProps, FormikValues } from 'formik';
import * as React from 'react';

import { CREATE_MANIFEST_BASE } from '../../services/ApiService/api';
import { App, DispatchRequest, MetaWithCallbacks } from '../../types/commons';

import AppForm, { createAppManifestUrl, validationSchema } from '../AppForm';
import RequestForm from '../RequestForm';

interface Props {
  app: App;
  appId: App['id'];
  handleCancel: () => void;
  handleDelete: () => void;
  handleSuccess: () => void;
  onEscDown: () => void;
  updateApp: DispatchRequest<App>;
}

const createAppSubmitHandler = (submit: DispatchRequest<App>): DispatchRequest<App> => (formData: App, meta: MetaWithCallbacks) => {
  const { appUrl, manifest_url, withAppUrl, ...rest } = formData;

  const computedManifestUrl = createAppManifestUrl({ appUrl, manifest_url, withAppUrl });

  submit({ ...rest, manifest_url: computedManifestUrl }, meta);
};

class EditAppForm extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    // sCU lifecycle needed for 2 reasons:
    // 1. Prevents invalid ':id' from being passed in, which causes invalid re-render
    // 2. Properly animate exit CSSTransitions, as a result of route switch
    return nextProps.appId === ':id' ? false : true;
  }

  renderAppForm = (formikProps: FormikProps<FormikValues>) => <AppForm {...formikProps} handleCancel={this.props.handleCancel} />;

  render() {
    const { app, handleDelete, handleSuccess, updateApp } = this.props;
    const { appUrl, contexts, intents, id, manifest_url = '', name, title, description, icon, images } = app;
    const createManifestIndex = manifest_url.indexOf(CREATE_MANIFEST_BASE);
    const initialAppUrl = createManifestIndex !== -1 ? manifest_url.slice(createManifestIndex + CREATE_MANIFEST_BASE.length) : appUrl;

    return (
      <RequestForm
        initialValues={{
          appUrl: initialAppUrl,
          contexts: contexts || [],
          description,
          icon,
          id,
          images,
          intents: intents || [],
          manifest_url: createManifestIndex === -1 ? manifest_url : '',
          name,
          title,
          withAppUrl: !!initialAppUrl,
        }}
        errorMessage={`There was an error trying to update ${title}`}
        render={this.renderAppForm}
        handleDeleteIconClick={handleDelete}
        headingText={`Edit ${title}`}
        onSubmitSuccess={handleSuccess}
        submit={createAppSubmitHandler(updateApp)}
        validationSchema={validationSchema}
      />
    );
  }
}

export default EditAppForm;
