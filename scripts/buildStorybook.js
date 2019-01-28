require('dotenv').config();

const execa = require('execa');
const getStorybookSvgs = require('./utils/getStorybookSvgs');

const STORYBOOK_SVGS = getStorybookSvgs();

// Build storybook.
const storybook = execa('build-storybook', ['-o', 'build/storybook'], {
  env: { FORCE_COLOR: true, STORYBOOK_ENV: true, STORYBOOK_SVGS: JSON.stringify(STORYBOOK_SVGS) },
});

// Pipe output to the current process.
storybook.stdout.pipe(process.stdout);
storybook.stderr.pipe(process.stderr);
