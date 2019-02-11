import * as React from 'react';

import { App, MetaWithCallbacks, PushRoute, RequestFormSubmit } from '../../types/commons';

import { ROUTES } from '../Router/consts';

import { createPushRouteHandler } from '../../utils/routeHelpers';
import AppForm, { validationSchema } from '../AppForm';
import RequestForm from '../RequestForm';

interface Props {
  app: App;
  onEscDown: () => void;
  updateApp: RequestFormSubmit<App>;
  pushRoute: PushRoute;
}

const createAppSubmitHandler = (submit: RequestFormSubmit<App>): RequestFormSubmit<App> => (formData: App, meta: MetaWithCallbacks) => {
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

const EditAppForm = ({ app, pushRoute, updateApp }: Props) => {
  const { appUrl, contexts, intents, id, manifest_url, name, title, description, icon, images } = app;

  return (
    <RequestForm
      initialValues={{
        appUrl,
        contexts: contexts || [],
        description,
        icon,
        id,
        images,
        intents: intents || [],
        manifest_url,
        name,
        title,
        withAppUrl: !!appUrl,
      }}
      errorMessage={`There was an error trying to update ${title}`}
      form={AppForm}
      handleDeleteIconClick={createPushRouteHandler(pushRoute, ROUTES.ADMIN_APPS_DELETE, app)}
      headingText={`Edit ${title}`}
      onSubmitSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_APPS)}
      submit={createAppSubmitHandler(updateApp)}
      validationSchema={validationSchema}
    />
  );
};

export default EditAppForm;
