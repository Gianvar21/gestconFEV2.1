const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const fs = require('fs');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/', 
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      BUILD_ENV: JSON.stringify('production'),
      SERVICE_URL: JSON.stringify('http://38.25.41.145:5000'),
    }),
  ],
});

