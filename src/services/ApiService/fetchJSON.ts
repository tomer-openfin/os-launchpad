import { logoutRequest } from '../../redux/me';

import { APIResponse, HTTPMethods } from '../../types/commons';

const createOptions = (requestMethod: HTTPMethods, body?, optionOverrides?): RequestInit => ({
  body: JSON.stringify(body || undefined),
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: requestMethod,
  mode: 'cors',
  ...optionOverrides,
});

const fetchJSON = (endpoint: string, requestMethod: HTTPMethods, body?, optionOverrides?): Promise<APIResponse> => {
  const options = createOptions(requestMethod, body, optionOverrides);

  return fetch(endpoint, options)
    .then(response => {
      if (response.status === 401) {
        window.store.dispatch(logoutRequest());

        throw new Error(`Unauthorized request, now terminating session.`);
      }
      return response;
    })
    .then(response => response.json())
    .then(json => {
      if (requestMethod === 'GET' && !json) {
        throw new Error(`${endpoint} did not return a valid resource: ${json}`);
      }
      return json;
    });
};

export default fetchJSON;
