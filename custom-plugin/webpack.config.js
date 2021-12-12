const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AutoUploadPlugin = require('./plugins/AutoUploadPlugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new AutoUploadPlugin({
      host: '8.131.61.235',
      username: 'root',
      password: 'lqr.971224',
      serverDir: '/usr/test'
    })
  ]
}