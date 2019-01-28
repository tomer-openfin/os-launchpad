/* tslint:disable-next-line:no-var-requires */
const urlRegex = require('url-regex');

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
    error = 'Email Required';
  } else if (!EMAIL_REGEXP.test(value)) {
    error = 'Invalid Email format';
  }
  return error;
};

export const validateTextField = value => {
  let error;

  if (!value) {
    error = 'Required';
  }

  return error;
};

export const validatePasswordField = value => {
  let error;

  if (!value) {
    error = 'Required';
  }

  if (value.length < 6) {
    error = 'Must be greater than 6 characters';
  }

  if (value.length >= 6) {
    const upperRegex = /\w*[A-Z]\w*/g;
    const numericRegex = /\w*[1-9]\w*/g;

    if (!upperRegex.test(value)) {
      error = 'Must have an uppercase character';
    }

    if (!numericRegex.test(value)) {
      error = 'Must have a numeric character';
    }

    // todo: check with OF Brian what symbol(s) (i.e !, @, #, etc) are valid
  }

  return error;
};

// todo: fix URL regex to only accept URLs ending in ".json"
export const validateURL = value => {
  if (!value) return 'Required';

  const validateCheck = urlRegex().test(value);

  if (!validateCheck) return 'Must be a valid URL.';

  return;
};

// todo: check with product team what phone numbers they'd like to store
// can have multiple country codes in the future
export const validatePhone = value => {
  if (!value) return;

  const coercedValue = Number(value);
  if (isNaN(coercedValue)) return 'No characters allowed';

  if (value.length < 10) return '10 digits required';

  return;
};
