require('dotenv').config();

const execa = require('execa');
const waitOn = require('wait-on');
const chalk = require('chalk');
const remotedev = require('remotedev-server');

const {
  HOST = '0.0.0.0',
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

// Start the remote Redux dev server.
remotedev({ hostname: HOST, port: 8000 });
