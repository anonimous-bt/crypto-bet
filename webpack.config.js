const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './main.js', // Your main JavaScript file
  output: {
    filename: 'bundle.js', // The name of the output bundle
    path: path.resolve(__dirname, './docs'), // The output directory
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify"),
      "buffer": require.resolve("buffer"),
      "process/browser": require.resolve("process/browser")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]

};