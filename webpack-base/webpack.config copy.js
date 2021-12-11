const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 生成指定模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// DefinePlugin 全局常量
const { DefinePlugin } = require('webpack')
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

// react HMR 
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, './dist')
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
              //  选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/less 导入。
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, less-loader
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'lqr',
      template: './public/index.html'
    }),
    // vue 模板中的全局常量  可以通过DefinePlugin插件指定
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
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
    new VueLoaderPlugin(),
    new ReactRefreshPlugin()
  ]
}
