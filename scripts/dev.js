require('dotenv').config();
const runCmd = require('./utils/runCmd');

runCmd(`webpack-dev-server --hot`);
