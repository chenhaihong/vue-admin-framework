const { resolve } = require('path');

module.exports = function() {
  return {
    module: {
      // =======
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
        },
        {
          test: /\.(wav|mp3|eot|ttf)$/,
          loader: 'file-loader',
        },
      ],
      // =======
    },
  };
};
