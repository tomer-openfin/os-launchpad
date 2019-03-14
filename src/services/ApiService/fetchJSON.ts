import { logoutError } from '../../redux/me';

import { APIResponse, HTTPMethods, ResponseStatus } from '../../types/commons';

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
      if (response.status === 401 && document.cookie) {
        const err = 'Unauthorized request, now terminating session.';

        alert('Your session has expired, logging out.');

        window.store.dispatch(logoutError({ status: ResponseStatus.FAILURE, message: err }));

        throw new Error(err);
      }
      return response;
    })
    .then(response => {
      if (response.status === 413) {
        const err = 'Payload too large.';

        throw new Error(err);
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
