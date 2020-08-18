const { resolve } = require('path');

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: resolve(__dirname, 'dist'),
    filename: "example.bundle.js",
    publicPath: __dirname
  },
  watch: true
}
