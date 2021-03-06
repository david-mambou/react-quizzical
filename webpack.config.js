const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "./src/pages/index.js"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {

        test: /\.css$/i,

        use: ['style-loader', 'css-loader'],

      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    static: './public',
  },
};
