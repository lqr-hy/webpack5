const path = require('path')
// 生成指定模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// DefinePlugin 全局常量
const { DefinePlugin } = require('webpack')
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 编译vue
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].bundle.js',
    path: path.join(__dirname, './dist'),
    chunkFilename: '[name].[hash:6].chunk.js', // 路由懒加载文件名
    // publicPath: 'https://lqr.com', // cdn地址
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        // 不打包 LICENSE
        extractComments: false
      }),
    ],
    splitChunks: {
      // async 异步代码
      // initial 同步代码
      // 所有
      chunks: 'all'
    },
    runtimeChunk: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        // 本质上是依赖typescript (typescript complier)
        // use: "ts-loader"
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'lqr',
      template: './public/index.html',
      cache: true, // 当文件没有发生变化的时候就使用缓存
      minify: process.env.Production ? {
        removeComments: false, // 是否移除注释
        removeRedundantAttributes: false, // 是否移除多余熟悉
        removeEmptyAttributes: false, // 是否移除一些空属性
        collapseWhitespace: false, // 是否移除空格
        minifyCSS: true, // 内部css压缩
        minifyJS: { // js 压缩并丑化
          mangle: {
            toplevel: true
          }
        }
      } : false
    }),
    // vue 模板中的全局常量  可以通过DefinePlugin插件指定
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      // 复制指定文件到打包目录
      patterns: [
        {
          from: 'public',
          globOptions: {
            // 忽略指定文件 必须加 **/
            ignore: ['**/index.html', '**/a.txt']
          }
        }
      ]
    }),
  ]
}
