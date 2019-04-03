import * as Yup from 'yup';

import API from '../../services/ApiService/api';
import { App } from '../../types/commons';
import { Values } from './AppForm';

export const validationSchema = Yup.object().shape({
  contexts: Yup.array().notRequired(), // enable when bring back contexts
  description: Yup.string().required('Required'),
  // TODO: hook up icon upload
  // icon: Yup.string().required('Required'),
  id: Yup.string().notRequired(),
  images: Yup.array().notRequired(),
  intents: Yup.array().notRequired(), // enable when bring back contexts
  name: Yup.string(), // injected by us before payload is sent
  title: Yup.string().required('Required'),
  url: Yup.string()
    .url('Must be a valid URL')
    .required('Required'),
});

export const createAppManifestUrl = (url: Values['url'], manifestType: Values['manifestType']) => {
  return manifestType === 'appUrl' ? API.CREATE_MANIFEST(url) : url;
};
