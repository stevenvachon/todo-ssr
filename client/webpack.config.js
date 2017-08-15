'use strict';
const webpack = require('webpack');

// TODO :: use NODE_ENV for toggling features -- dev env doesn't get react warnings
module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: `${__dirname}/dist/`
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              require('babel-plugin-transform-builtin-extend').default,
              require('babel-plugin-transform-class-properties'),
              require('babel-plugin-transform-object-rest-spread')
            ],
            presets: [
              ['env', {
                targets: {
                  "browsers": "last 2 versions"
                },
                useBuiltIns: true
              }],
              'react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    //new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      sourceMap: true
    })
  ]
};
