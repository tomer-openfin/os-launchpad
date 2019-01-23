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
