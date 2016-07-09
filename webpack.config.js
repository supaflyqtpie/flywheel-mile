const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './views/index.jsx',
  ],
  output: {
    path: path.join(__dirname, '/public/dist'),
    filename: 'bundle.js',
    publicPath: '/public/dist/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname,
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'css', 'scss'],
  },
};
