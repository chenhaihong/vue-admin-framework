const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function(isProd = true) {
  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    plugins: [
      new webpack.ProgressPlugin(),
      // new CleanWebpackPlugin()
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/,
          },
        },
        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
        name: true,
      },
    },
    stats: 'minimal',
    stats: {
      // copied from `'minimal'`
      // all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      // our additional options
      entrypoints: true,
      children: false,
      moduleTrace: true,
      errorDetails: true,
    },
  };
};
