const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const pkg = require('../packages/vue-admin-framework/package.json');

const root = resolve(__dirname, '..', 'packages/vue-admin-framework');
const isProd = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: resolve(root, 'src/index.js'),
  },
  output: {
    library: pkg.name,
    libraryTarget: 'umd',
    path: resolve(root, 'dist'),
    filename: `[name]${isProd ? '' : '.min'}.js`,
    chunkFilename: `[name]${isProd ? '' : '.min'}.js`,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name]${isProd ? '' : '.min'}.css`,
      chunkFilename: `[id]${isProd ? '' : '.min'}.css`,
      ignoreOrder: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          // plugins: ['syntax-dynamic-import'],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
          ],
        },
      },
      {
        resource: { test: /\.css$/i, exclude: /\.module\.css$/i },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProd,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 1 => postcss-loader;
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: resolve(__dirname),
              },
            },
          },
        ],
      },
      {
        resource: { test: /\.less$/i, exclude: /\.module\.less$/i },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProd,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 2 => postcss-loader, less-loader
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: resolve(__dirname),
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
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
    ...(isProd
      ? {
          minimize: true,
          minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        }
      : {}),
  },
  devServer: {
    open: true,
  },
  externals: {
    vue: 'Vue',
  },
};
