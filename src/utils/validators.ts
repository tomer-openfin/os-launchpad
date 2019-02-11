// custom validators for Formik <Field /> components
// can be combined with validationSchema's on <Formik /> components
// example: https://github.com/jaredpalmer/formik/blob/master/examples/CombinedValidations.js

// todo: check with product team what phone numbers they'd like to store
// can have multiple country codes in the future
export const validatePhone = value => {
  if (!value) return;

  const coercedValue = Number(value);
  if (Number.isNaN(coercedValue)) return 'No characters allowed';

  if (value.length < 10) return '10 digits required';

  return;
};
