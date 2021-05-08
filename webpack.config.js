const { join } = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: {
    contentscript: join(__dirname, 'src/contentscript/contentscript.js'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
};