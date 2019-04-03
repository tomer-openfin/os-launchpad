import * as Yup from 'yup';

import API from '../../services/ApiService/api';
import { App } from '../../types/commons';

export const validationSchema = Yup.object().shape({
  // only require either appUrl OR manifest_url but not both at the same time
  // withAppUrl = true when appUrl radio toggled, false when manifest_url toggled
  appUrl: Yup.string().when('withAppUrl', {
    is: withAppUrlVal => withAppUrlVal,
    then: Yup.string()
      .url('Must be a valid URL')
      .required('Required'),
  }),
  contexts: Yup.array().notRequired(), // enable when bring back contexts
  description: Yup.string().required('Required'),
  icon: Yup.string().required('Required'),
  id: Yup.string().notRequired(),
  images: Yup.array().notRequired(),
  intents: Yup.array().notRequired(), // enable when bring back contexts
  manifest_url: Yup.string().when('withAppUrl', {
    is: withAppUrlVal => !withAppUrlVal,
    then: Yup.string()
      .url('Must be a valid URL')
      .required('Required'),
  }),
  name: Yup.string(), // injected by us before payload is sent
  title: Yup.string().required('Required'),
  withAppUrl: Yup.boolean(),
});

interface CreateAppManifestUrl {
  appUrl: App['appUrl'];
  manifest_url: App['manifest_url'];
  withAppUrl: App['withAppUrl'];
}

export const createAppManifestUrl = ({ appUrl, manifest_url, withAppUrl }: CreateAppManifestUrl) => {
  return withAppUrl && appUrl ? API.CREATE_MANIFEST(appUrl) : manifest_url;
};
