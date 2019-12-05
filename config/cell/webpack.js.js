const { resolve } = require('path');

module.exports = function() {
  return {
    module: {
      // =======
      rules: [
        {
          test: /.js$/,
          include: [resolve(__dirname, 'src')],
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-syntax-dynamic-import'],
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
