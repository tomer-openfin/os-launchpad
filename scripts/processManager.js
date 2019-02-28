const chalk = require('chalk');
const openfinLauncher = require('hadouken-js-adapter');

const manifestUrl = 'https://cdn.openfin.co/demos/process-manager2/app.json';

console.log(chalk.bgGreen.whiteBright(`---> Server created, starting OpenFin from manifest at ${manifestUrl}`));

openfinLauncher.launch({ manifestUrl }).catch(err => console.warn(err));
