import { FormikProps, FormikValues } from 'formik';
import * as React from 'react';

import { App, DispatchRequest, MetaWithCallbacks } from '../../types/commons';

import AppForm, { createAppManifestUrl, validationSchema } from '../AppForm';
import RequestForm from '../RequestForm';

interface Props {
  createApp: DispatchRequest;
  handleCancel: () => void;
  handleSuccess: () => void;
  onEscDown: () => void;
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

const createAppSubmitHandler = (submit: DispatchRequest<App>): DispatchRequest<App> => (formData: App, meta: MetaWithCallbacks) => {
  // modify App Title to create the App Name (removed input field for this) and needed for formData
  // todo: ensure uniqueness -> sync up with OF Brian, how is this being handled on BE?
  formData.name = formData.title.replace(/\s/g, '');

  const { appUrl, manifest_url, withAppUrl, ...rest } = formData;

  const computedManifestUrl = createAppManifestUrl({ appUrl, manifest_url, withAppUrl });

  submit({ ...rest, manifest_url: computedManifestUrl }, meta);
};

const NewAppForm = ({ createApp, handleCancel, handleSuccess }: Props) => {
  const renderAppForm = (formikProps: FormikProps<FormikValues>) => <AppForm {...formikProps} handleCancel={handleCancel} focusFieldOnInitialMount />;

  return (
    <RequestForm
      initialValues={emptyApp}
      errorMessage="There was an error trying to create this app"
      render={renderAppForm}
      headingText="Create New App"
      onSubmitSuccess={handleSuccess}
      submit={createAppSubmitHandler(createApp)}
      validationSchema={validationSchema}
    />
  );
};

export default NewAppForm;
