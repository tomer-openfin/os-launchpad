import * as React from 'react';

import { App, MetaWithCallbacks, PushRoute, RequestFormSubmit } from '../../types/commons';

import { ROUTES } from '../Router/consts';

import { CREATE_MANIFEST_BASE } from '../../services/ApiService/api';
import { createPushRouteHandler } from '../../utils/routeHelpers';
import AppForm, { createAppManifestUrl, validationSchema } from '../AppForm';
import RequestForm from '../RequestForm';

interface Props {
  app: App;
  onEscDown: () => void;
  updateApp: RequestFormSubmit<App>;
  pushRoute: PushRoute;
}

const createAppSubmitHandler = (submit: RequestFormSubmit<App>): RequestFormSubmit<App> => (formData: App, meta: MetaWithCallbacks) => {
  const { appUrl, manifest_url, withAppUrl, ...rest } = formData;

  const computedManifestUrl = createAppManifestUrl({ appUrl, manifest_url, withAppUrl });

  submit({ ...rest, manifest_url: computedManifestUrl }, meta);
};

const EditAppForm = ({ app, pushRoute, updateApp }: Props) => {
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
