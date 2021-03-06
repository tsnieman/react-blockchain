'use strict';

const path = require('path');
const contextPath = path.resolve(__dirname, '..', 'src')

// Webpack
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // The 'base folder' for the app
  context: contextPath,

  // The entry point for different bundles
  // i.e. where the app "begins"/inits.
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    '../src/index.jsx',
  ],

  // The bundle outputs
  output: {
    path: path.resolve(__dirname, '..', 'built'),
    filename: '[name].bundle.js',
    publicPath: '/built/', // as it will be served
  },

  plugins: [
    // COMMON CHUNKS
    // any modules that get loaded ${minChunks} or more times,
    // it will bundle that into a commons.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2,
    }),

    new webpack.HotModuleReplacementPlugin(),

    // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    // (added per webpack-hot-middleware example)
    new webpack.NoErrorsPlugin(),

    // Generate HTML to serve
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],

  resolve: {
    // Where to look for modules (i.e. for importing/requiring)
    modules: [
      "node_modules",
      path.resolve(__dirname, "..", "src"),
      path.resolve(__dirname, "..", "config"),
    ],

    // Seems to resolve a "Can't resolve './Header'" (i.e. index) error from webpack
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      // Javascript
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
        ],
        use: [{
          loader: 'babel-loader',
          // options in .babelrc
        }],
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
            },
          },
          "postcss-loader", // options in postcss.config.js
        ],
      },
    ],
  },

  // Source maps
  devtool: 'cheap-module-eval-source-map',
};
