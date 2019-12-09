const { resolve } = require('path');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./cell/webpack.common');
const html = require('./cell/webpack.html');
const js = require('./cell/webpack.js.js');
const style = require('./cell/webpack.style');
const file = require('./cell/webpack.file');
const vue = require('./cell/webpack.vue');
const minify = require('./cell/webpack.minify');

const root = resolve(__dirname, '..', 'packages/demo');

module.exports = function(env, argv) {
  const isProd = env.production === true;
  return merge(common(isProd), style(isProd), html(), js(), file(), vue(), isProd ? minify() : {}, {
    entry: {
      index: resolve(root, 'src/index.js'),
    },
    output: {
      path: resolve(root, 'build'),
      filename: '[name].[hash:6].js',
      chunkFilename: '[id].[hash:6].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(root, 'src/assets/index.html'), // 指定模板html文件
        filename: 'index.html', // 输出的html文件名称
        chunks: ['index'],
      }),
    ],
    devServer: {
      open: true,
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      // 'vue-admin-framework': 'VueAdminFramework',
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue', '.less', '*'],
      alias: {
        '@': resolve(root, 'src'),
      },
    },
  });
};
