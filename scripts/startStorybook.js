require('dotenv').config();

const execa = require('execa');
const getStorybookSvgs = require('./utils/getStorybookSvgs');

const STORYBOOK_SVGS = getStorybookSvgs();

// Start storybook.
const storybook = execa('start-storybook', ['--port', '6006'], {
  env: { FORCE_COLOR: true, STORYBOOK_ENV: true, STORYBOOK_SVGS: JSON.stringify(STORYBOOK_SVGS) },
});

// Pipe output to the current process.
storybook.stdout.pipe(process.stdout);
storybook.stderr.pipe(process.stderr);
