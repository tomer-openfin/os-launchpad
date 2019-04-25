const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const webpack = require('webpack');

const transformOpenFinConfig = require('../scripts/utils/transformOpenFinConfig');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
    options: { useBabel: true },
  });

  if (mode === 'PRODUCTION') {
    config.plugins.push(new TSDocgenPlugin());
  }
  const MockApi = new webpack.NormalModuleReplacementPlugin(/ApiService\/index\.ts/, './__mocks__/index.ts');
  config.plugins.push(MockApi);
  config.resolve.extensions.push('.ts', '.tsx');
  if (mode !== 'PRODUCTION') {
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: './.storybook/finStoryPreload.js',
          to: '.',
        },
        {
          from: './.storybook/finStory.json',
          to: '.',
          transform: content =>
            transformOpenFinConfig(`${content}`, {
              rootUrl: `http://localhost:6006`,
            }),
        },
      ]),
    );
  }

  return config;
};
