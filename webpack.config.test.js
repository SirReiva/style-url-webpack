// utils
const path = require('path');
const glob = require('glob');


module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, 'test/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'test/build'),
  },
  module: {

    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: ['env'],
      //       },
      //     },

      //   ],
      //   exclude: ['node_modules'],
      //   include: [
      //     //  path.resolve(__dirname, 'src'),
      //     path.resolve(__dirname, 'test'),
      //   ],
      // },
      {
        test: /\.js$/,
        use: [
          { loader: 'index' },
        ],
        exclude: ['node_modules', 'test/build'],
        include: [
          //  path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test'),
        ],
      },
    ],
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname),
    ],
  },
};
