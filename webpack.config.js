const CopyPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');

const DIR_EXAMPLE = "example";
const DIR_OUT = 'out';

module.exports = ({ port }) => ({
  mode: 'development',
  entry: resolve(__dirname, DIR_EXAMPLE, 'index.js'),
  output: {
    path: resolve(__dirname, DIR_EXAMPLE, DIR_OUT),
    filename: 'example.bundle.js',
    publicPath: resolve(__dirname, DIR_EXAMPLE)
  },
  watch: true,
  devServer: {
    contentBase: resolve(__dirname, DIR_EXAMPLE, DIR_OUT),
    compress: false,
    port
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: resolve(DIR_EXAMPLE, 'index.html'), to: resolve(DIR_EXAMPLE, DIR_OUT) },
        { from: resolve(DIR_EXAMPLE, 'main.css'), to: resolve(DIR_EXAMPLE, DIR_OUT) },
      ],
    }),
  ],
})
