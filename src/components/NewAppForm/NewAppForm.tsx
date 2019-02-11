import * as React from 'react';

import { ROUTES } from '../Router/consts';

import { App, MetaWithCallbacks, PushRoute, RequestFormSubmit } from '../../types/commons';

import { createPushRouteHandler } from '../../utils/routeHelpers';
import AppForm, { validationSchema } from '../AppForm';
import RequestForm from '../RequestForm';

interface Props {
  createApp: RequestFormSubmit<App>;
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

const createAppSubmitHandler = (submit: RequestFormSubmit<App>): RequestFormSubmit<App> => (formData: App, meta: MetaWithCallbacks) => {
  // modify App Title to create the App Name (removed input field for this) and needed for formData
  // todo: ensure uniqueness -> sync up with OF Brian, how is this being handled on BE?
  formData.name = formData.title.replace(/\s/g, '');

  let payload;

  // Strip out manifest if appUrl and vice versa
  if (!!formData.withAppUrl) {
    const { manifest_url, withAppUrl, ...rest } = formData;
    payload = rest;
  } else {
    const { appUrl, withAppUrl, ...rest } = formData;
    payload = rest;
  }

  submit(payload, meta);
};

const NewAppForm = ({ createApp, pushRoute }: Props) => (
  <RequestForm
    initialValues={emptyApp}
    errorMessage="There was an error trying to create this app"
    form={AppForm}
    headingText="Create New App"
    onSubmitSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_APPS)}
    submit={createAppSubmitHandler(createApp)}
    validationSchema={validationSchema}
  />
);

export default NewAppForm;
