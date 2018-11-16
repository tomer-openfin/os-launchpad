require('dotenv').config();

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const transformOpenFinConfig = require('./scripts/utils/transformOpenFinConfig');
const appJson = require('./src/app.json');

const {
  API_URL,
  ENTERPRISE,
  HOST = '0.0.0.0',
  IS_ADMIN,
  LOGGER,
  MOCK_POSTMAN_URI,
  NODE_ENV = 'development',
  PORT = 8080,
  POSTMAN_API_KEY,
  RUNTIME_VERSION,
} = process.env;

const BACKEND = process.env.BACKEND || MOCK_POSTMAN_URI;
const DEPLOY_LOCATION = process.env.DEPLOY_LOCATION || `http://${HOST}:${PORT}`;
const isProduction = NODE_ENV === 'production';

module.exports = {
  mode: NODE_ENV,
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      { test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader' },
    ],
  },
  devServer: {
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    proxy: {
      '/api/**': {
        changeOrigin: true,
        logLevel: 'debug',
        target: BACKEND,
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(API_URL),
        APP_UUID: JSON.stringify(appJson.startup_app.uuid),
        ENTERPRISE: JSON.stringify(ENTERPRISE),
        IS_ADMIN: JSON.stringify(IS_ADMIN),
        LOGGER: JSON.stringify(LOGGER),
        MOCK_POSTMAN_URI: JSON.stringify(MOCK_POSTMAN_URI),
        NODE_ENV: JSON.stringify(NODE_ENV),
        POSTMAN_API_KEY: JSON.stringify(POSTMAN_API_KEY),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/app.json',
        to: '.',
        transform: content => (
          transformOpenFinConfig(`${content}`, {
            rootUrl: DEPLOY_LOCATION,
            runtimeVersion: RUNTIME_VERSION,
            isProduction,
          })
        ),
      },
      {
        from: './public',
        to: './public',
      },
    ]),
  ],
};
