const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './views/index.jsx',
  ],
  output: {
    path: path.join(__dirname, '/public/dist'),
    filename: 'bundle.js',
    publicPath: '/public/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname,
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
