const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  mode: NODE_ENV,
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/app.json',
        transform: content => {
          const confString = '' + content;
          return prepConfig(confString);
        },
        to: '.',
      },
      {
        from: './public',
        to: './public',
      },
    ]),
  ],
};

function prepConfig(configString) {
  const devConfigPath = `http://localhost:${PORT}`;

  const deployLocation = process.env.DEPLOY_LOCATION || devConfigPath;
  const runtimeVersion = process.env.RUNTIME_VERSION;

  configString = configString.replace(/%PUBLIC_URL%/g, deployLocation);

  if (runtimeVersion !== undefined && runtimeVersion !== '') {
    const config = JSON.parse(configString);
    config.runtime.version = runtimeVersion;
    configString = JSON.stringify(config, null, 4);
  }
  return configString;
}
