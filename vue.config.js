const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.pdf$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        protocol: 'wss',
        hostname: '6cgksxc3-8080.asse.devtunnels.ms',
        port: 443,
      },
    },
  },
};
