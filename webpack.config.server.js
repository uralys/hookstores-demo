const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    usingHookstores: './src/apps/using-hookstores/index.js'
  },
  devtool: 'inline-source-map',
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: path.resolve(__dirname, './src'),
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  devServer: {
    contentBase: './sandbox',
    watchContentBase: true,
    compress: true
  },
  plugins: [],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
