const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const fs = require('fs');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      BUILD_ENV: JSON.stringify('development'),
      SERVICE_URL: JSON.stringify('http://localhost:5000'),
      RECAPTCHA_KEY: JSON.stringify('xyz'),
      // WEBSITE_USER_PASSWORDS is being used for development only
      // WEBSITE_USER_PASSWORDS: fs.readFileSync(
      //   'website-user-passwords.json',
      //   'utf8'
      // ),
    }),
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: 'localhost',
    port: 8085,
    https: false,
    disableHostCheck: true,
    // key: fs.readFileSync('localhost-key.pem'), // LUIS: Hablar con Victor.
    // cert: fs.readFileSync('localhost.pem'), // LUIS: Hablar con Victor.
  },
});
