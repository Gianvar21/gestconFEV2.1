const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
      SERVICE_URL: JSON.stringify(process.env.SERVICE_URL),
      RECAPTCHA_KEY: JSON.stringify(process.env.RECAPTCHA_KEY),
    }),
  ],
});
