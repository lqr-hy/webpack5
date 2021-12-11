'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// css 压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// css 文件指纹
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// js 压缩
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// 每次构建清除上一次构建产物
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 打包的时候提示错误
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// 打包速度分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// 构建体积分析
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 并行压缩
const TerserPlugin = require("terser-webpack-plugin");
// 缓存loader转换
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// 多页面打包插件
const glob = require('glob')
const webpack = require('webpack')

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

module.exports = smp.wrap({
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          'babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('postcss-plugin-px2rem')({
                  rootValue: 50, // 设计稿宽度750px时的配置，可以根据设计稿大小调整此数值
                  unitPrecision: 6,
                  minPixelValue: 2, // 小于2px的样式不会被转成rem，因为在部分设备上可能会出现小于1px而渲染失败
                  exclude: /(src\/pages\/pc)/ // web文件px不需要转换成rem
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // css文件指纹,将css单独打包出来
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin({
      // css代码压缩
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(), // 每次清除dist目录
    new UglifyjsWebpackPlugin(), // js代码压缩
    new FriendlyErrorsWebpackPlugin(), // 错误提示
    // new BundleAnalyzerPlugin(),  // 构建包分析
    new webpack.DllReferencePlugin({
      manifest: require('./build/library/library.json')
    }),
    // new HardSourceWebpackPlugin()
  ].concat(htmlWebpackPlugin),
  stats: 'errors-only',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true
      })
    ]
  }
});
