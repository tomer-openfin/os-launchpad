const fs = require('fs');
const path = require('path');

module.exports = () => {
  const ASSETS_DIR = path.join(__dirname, '..', '..', 'src', 'assets');
  const STORYBOOK_SVGS = fs.readdirSync(ASSETS_DIR).filter(filename => /\.svg$/i.test(filename));

  return STORYBOOK_SVGS;
};
