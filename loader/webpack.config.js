const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[hash].bundle.js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/i,
      //   use: {
      //     loader: 'loader01',
      //     options: {
      //       name: 'lqr',
      //       age: 24
      //     }
      //   },
      //   // enforce: 'pre' // 可以控制loader执行顺序
      // },
      // {
      //   test: /\.js$/i,
      //   use: 'loader02'
      // }
      {
        test: /\.js$/i,
        use: {
          loader: 'lqrBabel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
        // enforce: 'pre' // 可以控制loader执行顺序
      },
      {
        test: /\.md$/i,
        use: [
          // 'html-loader', 
          'lqrMd-loader'
        ]
        // enforce: 'pre' // 可以控制loader执行顺序
      }
    ]
  },
  resolveLoader: {
    modules: ['node_modules', './lqr-loaders'] // loader 匹配机制
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin()
  ]
}
