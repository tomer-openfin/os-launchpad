export const createGetOptions = (): RequestInit => ({
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: 'GET',
  mode: 'cors',
});

export const createPostOptions = (body?): RequestInit => ({
  body: JSON.stringify(body),
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: 'POST',
  mode: 'cors',
});

export const createPutOptions = (body): RequestInit => ({
  body: JSON.stringify(body),
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: 'PUT',
  mode: 'cors',
});

export const createDeleteOptions = (): RequestInit => ({
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: 'DELETE',
  mode: 'cors',
});
