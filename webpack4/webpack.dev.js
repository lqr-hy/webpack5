'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// 多页面打包插件
const glob = require('glob')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugin = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]

    const match = entryFile.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]

    entry[pageName] = entryFile
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        //创建在内存中生成的html  插件
        template: path.join(__dirname, `./src/${pageName}/index.html`), // 指定模板页面路径 ，相当于把指定页面进行渲染
        filename: `${pageName}.html`, // 在浏览器生成页面的名称
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugin
  }
}

const { entry, htmlWebpackPlugin } = setMPA()
module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                require('autoprefixer')
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ].concat(htmlWebpackPlugin),
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only'
  }
}
