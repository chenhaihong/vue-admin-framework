const { resolve } = require('path');
const megre = require('webpack-merge');
const camelCase = require('camelcase');

const pkg = require('../packages/vue-admin-framework/package.json');

const common = require('./cell/webpack.common');
const js = require('./cell/webpack.js.js');
const style = require('./cell/webpack.style');
const file = require('./cell/webpack.file');
const vue = require('./cell/webpack.vue');
const minify = require('./cell/webpack.minify');

const root = resolve(__dirname, '..', 'packages/vue-admin-framework');

module.exports = function(env, argv) {
  const isProd = env.production === true;

  return megre(common(isProd), style(isProd), js(), file(), vue(), isProd ? minify() : {}, {
    entry: {
      index: resolve(root, 'src/index.js'),
    },
    output: {
      library: camelCase(pkg.name, { pascalCase: true }),
      libraryTarget: 'umd',
      path: resolve(root, 'build'),
      filename: `[name].umd${isProd ? '.min' : ''}.js`,
      chunkFilename: `[name].umd${isProd ? '.min' : ''}.js`,
    },
    externals: {
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue',
      },
      vuex: {
        commonjs: 'vuex',
        commonjs2: 'vuex',
        amd: 'vuex',
        root: 'Vuex',
      },
      'vue-router': {
        commonjs: 'vue-router',
        commonjs2: 'vue-router',
        amd: 'vue-router',
        root: 'VueRouter',
      },
      'element-ui': {
        commonjs: 'element-ui',
        commonjs2: 'element-ui',
        amd: 'element-ui',
        root: 'ELEMENT',
      },
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue', '.less', '*'],
      alias: {
        '@': resolve(root, 'src'),
      },
    },
  });
};
