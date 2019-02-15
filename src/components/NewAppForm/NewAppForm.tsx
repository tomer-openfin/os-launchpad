import * as React from 'react';

import { ROUTES } from '../Router/consts';

import { App, DispatchRequest, MetaWithCallbacks, PushRoute } from '../../types/commons';

import { createPushRouteHandler } from '../../utils/routeHelpers';
import AppForm, { createAppManifestUrl, validationSchema } from '../AppForm';
import RequestForm from '../RequestForm';

interface Props {
  createApp: DispatchRequest<App>;
  onEscDown: () => void;
  pushRoute: PushRoute;
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

const NewAppForm = ({ createApp, pushRoute }: Props) => (
  <RequestForm
    initialValues={emptyApp}
    errorMessage="There was an error trying to create this app"
    component={AppForm}
    headingText="Create New App"
    onSubmitSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_APPS)}
    submit={createAppSubmitHandler(createApp)}
    validationSchema={validationSchema}
  />
);

export default NewAppForm;
