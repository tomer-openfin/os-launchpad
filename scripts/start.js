require('dotenv').config();

const execa = require('execa');
const waitOn = require('wait-on');
const chalk = require('chalk');
const remotedev = require('remotedev-server');

const {
  NODE_ENV = 'development',
} = process.env;

if (NODE_ENV === 'production') {
  const err = `
    This script is not intended to run in production mode.
    Try building the static assets for production instead.

    $ NODE_ENV=production npm run build
  `;

  throw new Error(chalk.bgRed.white(err));
}

// Start the application.
const app = execa('webpack-dev-server', ['--hot'], { env: { FORCE_COLOR: true }});

// Pipe output to the current process.
app.stdout.pipe(process.stdout);
app.stderr.pipe(process.stderr);

// Wait for the app to be up and running before starting OpenFin.
waitOn({
  resources: ['http-get://localhost:8080'],
}, (err) => {
  if (err) {
    throw err;
  }

  // Start the remote Redux dev server.
  remotedev({ hostname: 'localhost', port: 8000 });

  // Now start OpenFin.
  const openfin = execa('npm', ['run', 'openfin'], { env: { FORCE_COLOR: true }});

  openfin.stdout.pipe(process.stdout);
  openfin.stderr.pipe(process.stderr);

  // When OpenFin closes, exit this process as well.
  openfin.on('close', () => {
    process.exit();
  });
});
