const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = function() {
  return {
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
      minimize: true,
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    externals: {
      vue: 'Vue',
    },
  };
};
