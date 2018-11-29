import urlRegex from 'url-regex';

export const validateEmail = value => {
  let error;

  // todo: determine email validation strategy
  const EMAIL_REGEXP = new RegExp(
    [
      '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
      '[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+',
      '[a-zA-Z]{2,}))$',
    ].join(''),
  );

  if (!value) {
    error = 'Email Input Field Required';
  } else if (!EMAIL_REGEXP.test(value)) {
    error = 'Invalid Email format';
  }
  return error;
};

export const validateTextField = value => {
  let error;

  if (!value) {
    error = 'Input Field Required';
  }

  return error;
};

// todo: fix URL regex to only accept URLs ending in ".json"
export const validateURL = value => {
  let error;

  if (!value) {
    error = 'Input Field Required';
  } else if (!urlRegex().test(value)) {
    error = 'Invalid Manifest URL, must end in .json file extension.';
  }

  return error;
};
