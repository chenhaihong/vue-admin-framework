const { resolve } = require('path');

module.exports = function() {
  return {
    module: {
      // =======
      rules: [
        {
          test: /.js$/,
          exclude: [/node_modules/],
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime'],
            presets: ['@vue/babel-preset-jsx'],
          },
        },
      ],
      // =======
    },
  };
};
