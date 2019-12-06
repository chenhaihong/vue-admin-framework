const { resolve } = require('path');

module.exports = function() {
  return {
    module: {
      // =======
      rules: [
        {
          test: /.js$/,
          // exclude: [/(node_modules|bower_components)/],
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-runtime',
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
              '@vue/babel-preset-jsx',
            ],
          },
        },
      ],
      // =======
    },
  };
};
