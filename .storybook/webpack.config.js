const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const webpack = require('webpack');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
    options: { useBabel: true },
  });

  if (env === 'PRODUCTION') {
    config.plugins.push(new TSDocgenPlugin());
  }
  const MockApi = new webpack.NormalModuleReplacementPlugin(/ApiService\/index\.ts/, './__mocks__/index.ts');
  config.plugins.push(MockApi);
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
