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
      ],
      // =======
    },
  };
};
