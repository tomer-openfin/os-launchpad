import * as Yup from 'yup';

import API, { CREATE_MANIFEST_FROM_APP_URL_BASE } from '../../services/ApiService/api';
import { App } from '../../types/commons';
import { ManifestType, Values } from './AppForm';

export const validationSchema = Yup.object().shape({
  appPath: Yup.string().when('manifestType', {
    is: manifestTypeVal => ManifestType.Path === manifestTypeVal,
    then: Yup.string()
      .trim()
      .required('Required'),
  }),
  appUrl: Yup.string().when('manifestType', {
    is: manifestTypeVal => ManifestType.AppUrl === manifestTypeVal,
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
  manifestType: Yup.string().oneOf(Object.values(Object(ManifestType))),
  manifestUrl: Yup.string().when('manifestType', {
    is: manifestTypeVal => ManifestType.Manifest === manifestTypeVal,
    then: Yup.string()
      .url('Must be a valid URL')
      .required('Required'),
  }),
  name: Yup.string(), // injected by us before payload is sent
  title: Yup.string().required('Required'),
});

export const getEditAppValues = (
  /* tslint:disable-next-line:variable-name */
  manifest_url: string,
  manifestType: ManifestType = ManifestType.Manifest,
): { appPath: string; appUrl: string; manifestUrl: string; manifestType: ManifestType } => {
  const result = { appPath: '', appUrl: '', manifestUrl: '', manifestType };

  switch (manifestType) {
    case ManifestType.Path:
      result.appPath = manifest_url;
      break;
    case ManifestType.Manifest:
      result.manifestUrl = manifest_url;
      break;
    case ManifestType.AppUrl:
      result.appUrl = getDisplayAppUrl(manifest_url);
      break;
    default:
      // manifestType missing on App
      const foundIndex = manifest_url.indexOf(CREATE_MANIFEST_FROM_APP_URL_BASE);
      const isManifest = foundIndex === -1;

      result.manifestType = isManifest ? ManifestType.Manifest : ManifestType.AppUrl;
      result.appUrl = isManifest ? '' : getDisplayAppUrl(manifest_url);
      result.manifestUrl = isManifest ? manifest_url : '';
      break;
  }
  return result;
};

export const getDisplayAppUrl = (appUrl: string): string => {
  const foundIndex = appUrl.indexOf(CREATE_MANIFEST_FROM_APP_URL_BASE);
  const sliceStart = foundIndex === -1 ? 0 : foundIndex + CREATE_MANIFEST_FROM_APP_URL_BASE.length;
  return appUrl.slice(sliceStart);
};

export const getSubmitAppData = (formData: Values, isNew: boolean = false): App => {
  // modify App Title to create the App Name (removed input field for this) and needed for formData
  // todo: ensure uniqueness -> sync up with OF Brian, how is this being handled on BE?
  const name = isNew ? formData.title.replace(/\s/g, '') : formData.name;

  const { appPath, appUrl, manifestUrl, ...rest } = formData;

  return { ...rest, name, manifest_url: createAppManifestUrl(appPath, appUrl, manifestUrl, formData.manifestType) };
};

export const createAppManifestUrl = (
  appPath: Values['appPath'],
  appUrl: Values['appUrl'],
  manifestUrl: Values['manifestUrl'],
  manifestType: Values['manifestType'],
) => {
  switch (manifestType) {
    case ManifestType.Path:
      return appPath;
    case ManifestType.Manifest:
      return manifestUrl;
    case ManifestType.AppUrl:
      return API.CREATE_MANIFEST_FROM_APP_URL(appUrl || '');
    default:
      return '';
  }
};
