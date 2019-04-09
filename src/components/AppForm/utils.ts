import * as Yup from 'yup';

import API from '../../services/ApiService/api';
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
  manifestType: Yup.string().oneOf(['appUrl', 'manifest']),
  manifestUrl: Yup.string().when('manifestType', {
    is: manifestTypeVal => ManifestType.Manifest === manifestTypeVal,
    then: Yup.string()
      .url('Must be a valid URL')
      .required('Required'),
  }),
  name: Yup.string(), // injected by us before payload is sent
  title: Yup.string().required('Required'),
});

export const createAppManifestUrl = (appUrl: Values['appUrl'], manifestUrl: Values['manifestUrl'], manifestType: Values['manifestType']) => {
  return manifestType === 'appUrl' && appUrl ? API.CREATE_MANIFEST_FROM_APP_URL(appUrl) : manifestUrl;
};
