const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = resolve(__dirname, '..', 'packages/demo');

module.exports = {
  mode: 'development',
  entry: {
    index: resolve(root, 'src/index.js'),
  },
  output: {
    path: resolve(root, 'dist'),
    filename: '[name].[hash:6].js',
    chunkFilename: '[id].[hash:6].js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].css',
      chunkFilename: '[id].[hash:6].css',
      ignoreOrder: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /.js$/,
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
              hmr: true,
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
              hmr: true,
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
  devServer: {
    open: true,
  },
  externals: {
    // 'vue-admin-framework': 'VueAdminFrame',
    vue: 'Vue',
  },
};
