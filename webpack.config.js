const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'dist', 'src', 'index.js'),
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react-env'],
          },
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
