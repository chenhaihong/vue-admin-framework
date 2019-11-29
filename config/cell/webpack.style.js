const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(isProd = true) {
  return {
    plugins: [
      // plugin for extracting style
      new MiniCssExtractPlugin({
        filename: `[name]${isProd ? '.min' : ''}.css`,
        chunkFilename: `[id]${isProd ? '.min' : ''}.css`,
        ignoreOrder: false,
      }),
    ],
    module: {
      rules: [
        // pure css
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
        // pure less
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
  };
};
