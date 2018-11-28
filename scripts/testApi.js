require('dotenv').config();

const execa = require('execa');

const {
  POSTMAN_API_KEY,
  POSTMAN_COLLECTION_UID,
  POSTMAN_ENVIRONMENT_UID,
} = process.env;

const BASE_URL = 'https://api.getpostman.com';
const COLLECTION_URL = `${BASE_URL}/collections/${POSTMAN_COLLECTION_UID}?apikey=${POSTMAN_API_KEY}`;
const ENVIRONMENT_URL = `${BASE_URL}/environments/${POSTMAN_ENVIRONMENT_UID}?apikey=${POSTMAN_API_KEY}`;

// Start the tests.
const app = execa(
  'newman',
  ['run', COLLECTION_URL, '--environment', ENVIRONMENT_URL],
  { stdio: 'inherit' },
);

app.on('close', (result) => {
  // Set the exit code for this process to match the exit code of the newman run.
  process.exitCode = result;
});
