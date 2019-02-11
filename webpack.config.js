require('dotenv').config();

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const transformOpenFinConfig = require('./scripts/utils/transformOpenFinConfig');
const appJson = require('./src/app.json');

const {
  API_URL,
  DEV_TOOLS_ON_STARTUP = false,
  ENTERPRISE,
  HOST = '0.0.0.0',
  MOCK_POSTMAN_URI,
  NODE_ENV = 'development',
  PASSWORD,
  PORT = 8080,
  POSTMAN_API_KEY,
  RUNTIME_VERSION,
  STORYBOOK_ENV = false,
  USERNAME,
} = process.env;

const BACKEND = process.env.BACKEND || MOCK_POSTMAN_URI;
const BACKEND_ORG = process.env.BACKEND_ORG || 'openfin';
const DEPLOY_LOCATION = process.env.DEPLOY_LOCATION || `http://${HOST}:${PORT}`;
const isProduction = NODE_ENV === 'production';

module.exports = {
  mode: NODE_ENV,
  devtool: 'source-map',
  entry: {
    main: './src/index.tsx',
    tabStrip: './src/layoutsService/tabStrip/main.ts',
    titleBar: './src/layoutsService/titleBar/main.ts',
  },
  output: {
    filename: chunkData => {
      const { name, hash } = chunkData.chunk;
      const filename = `${name}${isProduction && name !== 'titleBar' ? `.${hash}` : ''}.js`;
      return filename;
    },
    path: path.join(__dirname, '/build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: { useBabel: true } },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      { test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader' },
      {
        test: /\.css$/,
        use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    contentBase: path.join(__dirname, 'build'),
    proxy: {
      '/api/**': {
        changeOrigin: true,
        logLevel: 'debug',
        target: BACKEND,
        onProxyReq: req => {
          req.setHeader('openfin-os-organization', BACKEND_ORG);
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction ? 'styles.[hash].css' : 'styles.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(API_URL),
        APP_UUID: JSON.stringify(appJson.startup_app.uuid),
        DEV_TOOLS_ON_STARTUP: JSON.stringify(DEV_TOOLS_ON_STARTUP),
        ENTERPRISE: JSON.stringify(ENTERPRISE),
        HOST: JSON.stringify(HOST),
        MOCK_POSTMAN_URI: JSON.stringify(MOCK_POSTMAN_URI),
        NODE_ENV: JSON.stringify(NODE_ENV),
        PASSWORD: JSON.stringify(PASSWORD),
        POSTMAN_API_KEY: JSON.stringify(POSTMAN_API_KEY),
        STORYBOOK_ENV: JSON.stringify(STORYBOOK_ENV),
        USERNAME: JSON.stringify(USERNAME),
      },
    }),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      env: NODE_ENV,
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['tabStrip', 'styles.css'],
      env: NODE_ENV,
      filename: 'tabStrip.html',
      template: path.join(__dirname, 'src', 'layoutsService', 'tabStrip', 'tabStrip.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/app.json',
        to: '.',
        transform: content =>
          transformOpenFinConfig(`${content}`, {
            rootUrl: DEPLOY_LOCATION,
            runtimeVersion: RUNTIME_VERSION,
            isProduction,
          }),
      },
      {
        from: './public',
        to: './public',
      },
    ]),
  ],
};
