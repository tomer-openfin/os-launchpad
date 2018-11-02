require('dotenv').config();
const runCmd = require('./utils/runCmd');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;

runCmd(`webpack-dev-server --hot --history-api-fallback --host ${HOST} --port ${PORT}`);
