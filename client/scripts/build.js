'use strict';
const babel = require('babel-transform-dir');
const prettyBytes = require('pretty-bytes');
const {promisify} = require('util');
const webpack = require('webpack');

const gzipSize = promisify(require('gzip-size'));
const readFile = promisify(require('fs').readFile);

const build = async () => {
  process.on('unhandledRejection', error => console.log(error))

  await Promise.all([
    bundle(),
    commonjs()
  ]);

  const size = await filesize(await readFile('bundle/app.js'));

  console.log(`${size.raw}, ${size.gzipped} gzipped`);
};

// TODO :: https://github.com/webpack/webpack/issues/5605
const bundle = () => new Promise((resolve, reject) => {
  webpack(webpackConfig).run((error, stats) => {
    if (error != null) {
      reject(error);
    } else if (stats.hasErrors()) {
      reject(stats.compilation.errors[0]);
    } else if (stats.hasWarnings()) {
      resolve(stats.compilation.warnings);
    } else {
      resolve();
    }
  });
});

const commonjs = async () => {
  const babelrc = JSON.parse(await readFile('.babelrc', 'utf8'));

  // TODO :: https://github.com/babel/babel/issues/6178
  process.env.BABEL_ENV = 'node';

  return babel('./esm', './cjs', {babel: babelrc});
};

const filesize = async source => ({
  gzipped: prettyBytes(await gzipSize(source)),
  raw: prettyBytes(source.length)
});

// TODO :: use NODE_ENV for toggling features -- dev env doesn't get react warnings
const webpackConfig = {
  bail: true,
  devtool: 'source-map',
  entry: './esm/index.js',
  output: {
    filename: 'app.js',
    path: `${__dirname}/../bundle/`
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            forceEnv: 'browser'
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

build();
